const _routev1 = require('./_route.js');
const preferences = require('./preferences.rte.js');

_routev1.use(preferences);

module.exports = _routev1;