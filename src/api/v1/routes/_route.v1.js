const _routev1 = require('./_route.js');
const preferences = require('./preferences.rte.js');
const posts = require('./posts.rte.js');

_routev1.use(preferences, posts);

module.exports = _routev1;