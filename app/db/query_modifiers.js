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

function modifiedManufacturingTime(time, industryStats) {
  const TE_mult = industryStats["blueprint"]["time efficiency"] * -0.02 + 1;
  const station_mult = industryStats["station"]["time modifier"];
  const industry_mult =
    industryStats["character"]["industry level"] * -0.04 + 1;
  const adv_industry_mult =
    industryStats["character"]["advanced industry level"] * -0.03 + 1;

  return time * TE_mult * station_mult * industry_mult * adv_industry_mult;
}

module.exports = {
  makeIndustryStatsObject,
  modifiedMaterialsList,
  modifiedManufacturingTime,
};
