const preferences = require('./_route.js');
const { StorePreferences, GetPreferences, UpdatePreferences, PlaceTypesParamCheck, PlaceTypes } = require('../handlers/preferences.hdlr.js');

preferences.route('/preferences/:types?')
  .all((req, res, next) => {
    console.info('VERIFYING_USER_AUTHORIZATION...');
    if (req.get('Authorization') === undefined || req.get('Authorization').substring(0, 6) !== 'Bearer') {
      console.info('AUTHORIZATION_FAIL!');
      return res.status(401)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          message: 'no authorization header',
          preferences: null,
          formattedAddress: null
        });
    } // check if header[Authorization] starting with prefix Bearer
    console.info('SUCCESS...');
    next()
  })
  .post(StorePreferences)
  .put(PlaceTypesParamCheck, PlaceTypes)
  .patch(UpdatePreferences)
  .get(GetPreferences);

module.exports = preferences;