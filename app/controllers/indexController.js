const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const qmods = require("../db/query_modifiers");

const station = require("../json/industry_amamake.json");
const character = require("../json/character_tav.json");
const blueprint = require("../json/blueprint_maxed.json");
const industryStats = qmods.makeIndustryStatsObject(
  station,
  blueprint,
  character
);

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

exports.indexGet = (req, res) => {
  res.render("janiceLookup", {
    title: "Janice Material Calculator",
  });
};

exports.materialsGet = async function (req, res) {
  const bpID = await db.getTypeIdFromName(req.query.bpname);
  const mats = await db.getMaterialsFromBlueprintID(bpID);
  const mats_modified = qmods.modifiedMaterialsList(mats, industryStats);
  const manuTimeSeconds = await db.getManufacturingTimeFromBPID(bpID);
  const manuTimeHours = Math.round((manuTimeSeconds / 3600) * 10) / 10;
  res.render("janiceOutput", {
    title: req.query.bpname + " Materials",
    mats: mats_modified,
    time: manuTimeHours * req.query.runs,
    runs: req.query.runs,
  });
};
