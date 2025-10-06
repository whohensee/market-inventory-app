const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

exports.indexGet = (req, res) => {
  res.render("janiceLookup", {
    title: "Janice Material Calculator",
  });
};

exports.materialsGet = async function (req, res) {
  const mats = await db.getMaterialsFromBlueprintName(req.query.bpname);
  const bpID = await db.getTypeIdFromName(req.query.bpname);
  const manuTimeSeconds = await db.getManufacturingTimeFromBPID(bpID);
  const manuTimeHours = Math.round((manuTimeSeconds / 3600) * 10) / 10;
  res.render("janiceOutput", {
    title: req.query.bpname + " Materials",
    mats: mats,
    time: manuTimeHours * req.query.runs,
    runs: req.query.runs
  });
};
