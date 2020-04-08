const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  const { periodType, timeToElapse } = data;

  let convertToDays = timeToElapse;

  switch (periodType) {
    case 'months':
      convertToDays = timeToElapse * 30;
      break;

    case 'weeks':
      convertToDays = timeToElapse * 7;
      break;

    default:
      convertToDays = timeToElapse;
      break;
  }

  const power = parseInt(convertToDays / 3, 10);
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** power;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** power;

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;


  const availBeds = data.totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime = (availBeds - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = availBeds - severeImpact.severeCasesByRequestedTime;


  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;

  impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  impact.dollarsInFlight = impact.infectionsByRequestedTime
  * avgDailyIncomeInUSD
  * avgDailyIncomePopulation * convertToDays;


  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime
  * avgDailyIncomeInUSD
  * avgDailyIncomePopulation * convertToDays;

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
