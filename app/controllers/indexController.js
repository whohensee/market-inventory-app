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
  const mats = await db.getMaterialsFromBlueprintName(req.query.bpname)
  res.render("janiceOutput", {
    title: req.query.bpname + " Materials",
    mats: mats,
  });
};
