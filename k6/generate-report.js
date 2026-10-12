
const reporter = require('k6-html-reporter');

const options = {
  jsonFile: 'C:/k6/UniReg-Cloud/summary.json',
  output: 'C:/k6/UniReg-Cloud/report',
};

reporter.generateSummaryReport(options);
