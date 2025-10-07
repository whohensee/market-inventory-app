const pool = require("./pool");

// The idea is any item-related query will start with getting
// the typeID with getTypeIdFromName, then use the ID to
// interact with future queries

// so most functions should be getXFromId, not getXFromName

async function getTypeIdFromName(name) {
  const qstring =
    'SELECT "typeID" FROM "invTypes" WHERE "typeName" = \'' + name + "';";
  const { rows } = await pool.query(qstring);
  return rows[0]["typeID"];
}

async function getNameFromTypeID(id) {
  const qstring =
    'SELECT "typeName" FROM "invTypes" WHERE "typeID" =' + id + ";";
  const { rows } = await pool.query(qstring);
  return rows[0]["typeName"];
}

// ------------------- START get Product ID ---------------------

async function getProductFromBlueprintTypeID(bpID) {
  const qstring =
    'SELECT "productTypeID", "quantity" FROM "industryActivityProducts"' +
    ' WHERE "typeID"=' +
    bpID +
    ' AND "activityID"=1;';
  const { rows1 } = await pool.query(qstring);
  const prodID = rows1[0]["productTypeID"];
  const { rows2 } = await pool.query(qstring);
  const prodQuant = rows2[0]["quantity"];
  return [prodID, prodQuant];
}

// ------------------- END get Product ID ---------------------
// ------------------- START get Materials From bpID ----------

async function getMaterialsFromBlueprintID(bpID) {
  let qstring =
    'SELECT "materialTypeID", "quantity" ' +
    'FROM "industryActivityMaterials" ' +
    'WHERE "typeID" = ' +
    bpID +
    ' AND "activityID" = 1'; // 1 is Manufacturing
  const { rows } = await pool.query(qstring);
  // add a name field
  for (const obj of rows) {
    obj["name"] = await getNameFromTypeID(obj["materialTypeID"]);
  }
  return rows;
}

// ------------------- END get Materials From bpID ----------


async function getManufacturingTimeFromBPID(bpID) {
  const qstring =
    'SELECT time FROM "industryActivity" WHERE "activityID"=1 AND "typeID"=' +
    bpID +
    ";";
  const { rows } = await pool.query(qstring);
  return rows[0]["time"];
}

module.exports = {
  getTypeIdFromName,
  getNameFromTypeID,
  getProductFromBlueprintTypeID,
  getMaterialsFromBlueprintID,
  getManufacturingTimeFromBPID,
};
