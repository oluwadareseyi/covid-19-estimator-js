const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  const power = Number((data.timeToElapse / 3).toFixed(0));
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** power;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** power;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;

// const repObj = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };
