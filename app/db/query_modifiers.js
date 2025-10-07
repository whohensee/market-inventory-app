// generate an industryStats object from a station, blueprint, and character json
function makeIndustryStatsObject(station, blueprint, character) {
  const industryStats = {};
  industryStats["station"] = station;
  industryStats["blueprint"] = blueprint;
  industryStats["character"] = character;
  return industryStats;
}

// take in a materials list and modify it by industryAttributes

function modifiedMaterialsList(mats, industryStats) {
  const ME_mult = industryStats["blueprint"]["material efficiency"] * -0.01 + 1;
  const station_mult = industryStats["station"]["material modifier"];
  const materialMultiplier = ME_mult * station_mult;

//   const modified_mats = {};
//   Object.assign(modified_mats, mats);
  for (const mat of mats) {
    mat["quantity"] *= materialMultiplier;
  }
  return mats;
}

module.exports = {
  makeIndustryStatsObject,
  modifiedMaterialsList,
};
