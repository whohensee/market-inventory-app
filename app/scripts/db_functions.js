async function getTypeIdFromName(pool, name) {
  const qstring =
    'SELECT "typeID" FROM "invTypes" WHERE "typeName" = \'' + name + "';";
  //   console.log(qstring);
  const res = await pool.query(qstring);
  return res["rows"][0]["typeID"];
}

async function getNameFromTypeID(pool, id) {
  const qstring =
    'SELECT "typeName" FROM "invTypes" WHERE "typeID" =' + id + ";";
  //   console.log(qstring);
  const res = await pool.query(qstring);
  return res["rows"][0]["typeName"];
}

async function getProductIDFromBlueprintName(pool, name) {
  const bpID = await getTypeIdFromName(pool, name);
  const qstring =
    'SELECT "productTypeID", "quantity" FROM "industryActivityProducts"' +
    ' WHERE "typeID"=' +
    bpID +
    ' AND "activityID"=1;';
//   console.log(qstring);
  const result1 = await pool.query(qstring);
  const prodID = result1["rows"][0]["productTypeID"];
  const result2 = await pool.query(qstring);
  const prodQuant = result2["rows"][0]["quantity"];
  return [prodID, prodQuant];
}

async function getMaterialsFromBlueprintName(pool, name) {
  const productID = await getTypeIdFromName(pool, name);
  // figure out which table has blueprint material data

  // query industryActivityMaterials for manufacturing reqs
  let qstring =
    'SELECT "materialTypeID", "quantity" ' +
    'FROM "industryActivityMaterials" ' +
    'WHERE "typeID" = ' +
    productID +
    ' AND "activityID" = 1'; // 1 is Manufacturing
//   console.log(qstring);
  const materials = await pool.query(qstring);
  const dataObj = materials["rows"];
  // want to add a name column, but need the lookup name from id func
  for (const obj of dataObj) {
    obj["name"] = await getNameFromTypeID(pool, obj["materialTypeID"]);
  }
  return dataObj;
}

export {
  getTypeIdFromName,
  getNameFromTypeID,
  getProductIDFromBlueprintName,
  getMaterialsFromBlueprintName,
};
