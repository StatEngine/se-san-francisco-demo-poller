import request from 'request';

import config from './config';

class DataSF {
  constructor() {
    this.options = {
      uri: `${config.dataSF.endpoint}?$limit=10000`,
      headers: {
        'X-App-Token': config.dataSF.token,
      },
      json: true,
    };
  }

  incidents(from, to, cb) {
    this.options.uri += `&$where=call_date between '${from}' and '${to}'`;

    request(this.options, (err, response, body) => {
      if (err) {
        return cb(err);
      } else if (!response || response.statusCode !== 200) {
        return cb(new Error(`Unexpected HTTP response: ${response.statusCode}`));
      }

      return cb(null, body);
    });
  }
}

module.exports = DataSF;
