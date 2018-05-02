import request from 'request';
import async from 'async';
import moment from 'moment';
import zlib from 'zlib';

import config from './config';

class StatEngine {
  constructor() {
    this.config = config.statEngine;
    this.fd = undefined;
  }

  authorize() {
    console.info('Authorizing with StatEngine');

    return new Promise((resolve, reject) => {
      const options = {
        uri: `${this.config.endpoint}/users/me`,
        method: 'GET',
        qs: {
          apikey: this.config.apiKey,
        },
        json: true,
      };

      request(options, (err, response) => {
        if (err) return reject(err);

        this.fd = response.body.fire_department;
        return resolve();
      });
    });
  }

  ingest(payload) {
    const incident = {
      id: payload.rowid,
      timestamp: moment.utc().format(),
      firecaresId: this.fd.firecares_id,
      msgType: 'FIRE_INCIDENT',
      action: 'UPSERT',
      payload: Buffer.from(JSON.stringify(payload)).toString('base64'),
    };

    return new Promise((resolve, reject) => {
      let body;
      async.series([
        (done) => {
          zlib.deflate(JSON.stringify(incident), (err, buffer) => {
            if (err) return done(err);
            body = buffer;
            return done();
          });
        },
        (done) => {
          const options = {
            uri: `${this.config.endpoint}/fire-departments/${this.fd._id}/fire-incidents}`,
            method: 'POST',
            qs: {
              apikey: this.config.apiKey,
            },
            headers: {
              'Content-Encoding': 'deflate',
              'Content-Type': 'application/json',
            },
            body,
          };

          request(options, (err, response) => {
            if (err) return done(err);
            if (response.statusCode !== 204) return done(new Error(`Unexpected response: ${response.statusCode}`));

            return done();
          });
        },
      ], (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }
}

module.exports = StatEngine;
