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
  // have been sent the name of the blueprint
  // need to call a function here that looks stuff up and
  // returns the materials object I want
  const val = await db.getTypeIdFromName("Rupture");
  const materialObj = [{ name: val, quantity: val }];
  res.render("janiceOutput", {
    title: req.params.bpname + "Materials",
    mats: materialObj,
  });
};
