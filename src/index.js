import async from 'async';
import moment from 'moment';

import DataSF from './data-sf';
import StatEngine from './stat-engine';

const se = new StatEngine();

const TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

function pollDates(from, to) {
  console.info(`Polling DataSF, from: ${from}, to: ${to}`);

  const dataSF = new DataSF();
  dataSF.incidents(from.format(TIME_FORMAT), to.format(TIME_FORMAT), (err, incidents) => {
    if (err) {
      console.error(err);
      return;
    }

    console.info(`Found ${incidents.length} incidents`);
    async.eachLimit(incidents, 1, (incident, done) => {
      console.info(`Ingesting ${incident.rowid}`);
      se.ingest(incident)
        .then(() => done())
        .catch(e => done(e));
    });
  });
}

function poll() {
  const to = moment.utc();
  const from = moment.utc().subtract(5, 'days');
  pollDates(from, to);
}

// Poll on startup
se.authorize()
  .then(() => {
    // Poll every hour
    poll();
    setInterval(() => {
      poll();
    }, 3600000);
  })
  .catch(e => console.error(e));
