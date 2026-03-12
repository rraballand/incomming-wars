module.exports = {
  default: {
    require: ['features/support/*.ts', 'features/step-definitions/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
    publishQuiet: true
  }
};
