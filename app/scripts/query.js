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

///////////////// Command line functions ////////////////////

const t1 = await getNameFromTypeID(pool, 974);
const t2 = await getTypeIdFromName(pool, "Rupture Blueprint");

const mats = await getMaterialsFromBlueprintName(pool, "Rupture Blueprint");

await pool.end();

console.log("--- type ID lookup test ---");
console.log("Rupture Blueprint: " + t2);
console.log("--- Name lookup test ---");
console.log("974: " + t1);
console.log("\n\n--- Materials Lookup Test ---");
console.log(mats);
