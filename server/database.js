const config = require('./data.js');
const Pool = require('pg').Pool;

const pool = new Pool({
  ...config,
});

module.exports = pool;
