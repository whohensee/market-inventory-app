const { Pool } = require("pg");
// require("dotenv").config();
// require("dotenv").config({ path: "./.env" });
// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
console.log(process.env);
console.log(process.env.PGPASSWORD);
const connectionString =
  // "postgresql://db:5432?user=yaml&password=" + process.env.PGPASSWORD;
  "postgresql://db:5432";

module.exports = new Pool({
  connectionString: connectionString,
});

// I have NO idea why I cant read this fking password from the .env
// this file is a mess. I THINK the proper way to do this is to have
// the require env statment at the very top, even though its also
// in app.js
