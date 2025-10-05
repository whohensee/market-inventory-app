import pg from "pg";
import {
  getTypeIdFromName,
  getMaterialsFromBlueprintName,
  getProductIDFromBlueprintName,
  getNameFromTypeID,
} from "./db_functions.js";
import "dotenv/config.js";
const { Pool } = pg;

const connectionString = "postgresql://db:5432?user=yaml";

const pool = new Pool({
  connectionString,
});

// this function should be passed a blueprint name, and it will format
// for https://janice.e-351.com/ a nice paste to evaluate cost
// Usage: Simple input
// node janice.js "Rupture Blueprint"
// while inside the container in the proper folder

const bp_name = process.argv[2];

const materials = await getMaterialsFromBlueprintName(pool, bp_name);

for (const mat of materials) {
  console.log(mat["name"] + " " + mat["quantity"]);
}

// stick the product at the end
const product = await getProductIDFromBlueprintName(pool, bp_name);
console.log(await getNameFromTypeID(pool, product[0]) + " " + product[1]);

await pool.end();
