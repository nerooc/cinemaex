const config = require('./dbdata.json');
const { Pool } = require('pg');

// Creating a new connection with the database, based on the config data
const pool = new Pool({ ...config });

module.exports = pool;
