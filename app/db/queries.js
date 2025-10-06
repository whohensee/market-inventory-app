const pool = require("./pool");

// each function here needs to be modified to use the nice
// { rows } syntax

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

async function getProductIDFromBlueprintName(name) {
  const bpID = await getTypeIdFromName(name);
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

async function getMaterialsFromBlueprintName(name) {
  const productID = await getTypeIdFromName(name);
  let qstring =
    'SELECT "materialTypeID", "quantity" ' +
    'FROM "industryActivityMaterials" ' +
    'WHERE "typeID" = ' +
    productID +
    ' AND "activityID" = 1'; // 1 is Manufacturing
  const { rows } = await pool.query(qstring);
  // add a name field
  for (const obj of rows) {
    obj["name"] = await getNameFromTypeID(obj["materialTypeID"]);
  }
  return rows;
}

module.exports = {
  getTypeIdFromName,
  getNameFromTypeID,
  getProductIDFromBlueprintName,
  getMaterialsFromBlueprintName,
};
