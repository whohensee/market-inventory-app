import pg from 'pg';
const { Pool, Client } = pg;
// require("dotenv").config();
import 'dotenv/config.js'
 
// const pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
// });

// console.log("made it here 1");


// await pool.query('SELECT NOW()');

// const connectionString = 'postgresql://yaml@localhost:8001/sde'
const connectionString = 'postgresql://db:5432?user=yaml&dbname=sde'
 
const pool = new Pool({
  connectionString,
})
 
const result = await pool.query('SELECT * FROM "invTypes" LIMIT 50;')

const lookup = await pool.query('SELECT * FROM "invTypes" WHERE "typeName" = \'Rupture Blueprint\';')
await pool.end()

// console.log(Object.keys(result));
// console.log("--------------command---------")
// console.log(result['command']);
// console.log("--------------rowCount---------")
// console.log(result['rowCount'])
// console.log("--------------oid---------")
// console.log(result['oid'])
// console.log("--------------rows---------")
// console.log(result['rows'])
// console.log("--------------fields---------")
// console.log(result['fields'])
// console.log(result['rowAsArray'])

// for (const row of result['rows']) {
//   console.log("id: " + row['typeID'] + ", name: " + row['typeName'])
// }
console.log(lookup['rows'])

// const client = new Client({
//   connectionString,
// })
 
// await client.connect()
 
// await client.query('SELECT NOW()')
 
// await client.end()