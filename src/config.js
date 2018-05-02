module.exports = {
  dataSF: {
    endpoint: process.env.DATA_SF_ENDPOINT || 'https://data.sfgov.org/resource/enhu-st7v.json',
    token: process.env.DATA_SF_APP_TOKEN,
  },
  statEngine: {
    endpoint: process.env.STAT_ENGINE_ENDPOINT || 'http://localhost:8080/api',
    apiKey: process.env.STAT_ENGINE_API_KEY || 'sfDemo',
  },
};
