const dotenv = require("dotenv");
const pg = require("pg");
dotenv.config();

module.exports = {
  client: "pg",
  connection: process.env.POSTGRES_DB_URL,
  useNullAsDefault: true,
  migrations: {
    directory: "./migrations",
  },
  connectionTimeoutMillis: 8000,
  pool: {
    min: 2,
    max: 50,
    idleTimeoutMillis: 8000,
    createTimeoutMillis: 8000,
    acquireTimeoutMillis: 8000,
  },
  ssl: {
    rejectUnauthorized: false,
  },
};

export {};
