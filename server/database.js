const config = require('./dbdata.json');
const { Pool } = require('pg');

const pool = new Pool({ ...config });

module.exports = pool;
