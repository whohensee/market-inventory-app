// require("dotenv").config();
const { Pool } = require("pg");
// require("dotenv").config({ path: "./.env" });
const connectionString =
  // "postgresql://db:5432?user=yaml&password=" + process.env.PGPASSWORD;
  "postgresql://db:5432?user=yaml";

module.exports = new Pool({
  connectionString: connectionString,
});

