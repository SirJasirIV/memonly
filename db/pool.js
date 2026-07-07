const { Pool } = require("pg");
const { connectionString } = require("pg/lib/defaults");

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
});