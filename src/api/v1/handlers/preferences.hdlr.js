const UsersService = require('../services/users.svcs.js');
const jwt = require('jsonwebtoken');

async function StorePreferences(req, res) {
  const token = req.get('Authorization').substring(7);
  try {
    const decoded = jwt.verify(token, 'ch2-ps514');
    const User = new UsersService(decoded.documentId);
    const addingPreferences = await User.addPreferences(req.body);
    if (addingPreferences.result !== null) {
      // ADD HEADER AND STATUS CODE
      return res.status(201)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          success: true,
          preferences: addingPreferences.result
        }).end();
    }
  } catch (error) {
    res.status(400)
      .append('X-Powered-By', 'Biger x Barjakoub')
      .json({
        success: false,
        message: "There is something wrong with the user token",
        error
      }).end();
  }
}

async function GetPreferences(req, res) {
  const token = req.get('Authorization').substring(7);
  const formatted = req.query.formatted?.toLowerCase() === 'true' ? true : false;
  try {
    const decoded = jwt.verify(token, 'ch2-ps514');
    const User = new UsersService(decoded.documentId);
    const gettingPreferences = await User.getPreferences(formatted);
    if (gettingPreferences?.result === undefined) {
      return res.status(200)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          success: true,
          preferences: gettingPreferences
        });
    } else {
      return res.status(400)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          success: false,
          operations: gettingPreferences
        });
    }
  } catch (error) {
    res.status(400)
      .append('X-Powered-By', 'Biger x Barjakoub')
      .json({
        success: false,
        message: "There is something wrong with the user token or any",
        error
      }).end();
  }
}

async function UpdatePreferences(req, res) {
  const token = req.get('Authorization').substring(7);
  /* PROBLEM : ketika pengguna mengirimkan seluruh property pada req.body, how to handle it? */
  try {
    const decoded = jwt.verify(token, 'ch2-ps514');
    const User = new UsersService(decoded.documentId);
    const updatingPreferences = await User.updatePreferences(req.body);
    /* PROBLEMMMMMM */
    if (updatingPreferences?.result === undefined) {
      return res.status(200)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json(updatingPreferences)
        .end();
    } else {
      return res.status(400)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          success: false,
          operations: updatingPreferences
        }).end();
    }
  } catch (error) {
    res.status(400)
      .append('X-Powered-By', 'Biger x Barjakoub')
      .json({
        success: false,
        message: "There is something wrong with the user token or any",
        error
      }).end();
  }
}

function PlaceTypesParamCheck(req, res, next) {
  const param = req.params.types;
  /* PASS */
  console.info('CHECKING REQUEST PARAM...');
  if (param !== 'types') {
    console.info('PARAM UNDEFINED, FAIL!!!')
    return res.status(404)
      .append('X-Powered-By', 'Biger x Barjakoub')
      .json({
        status: 'fail',
        message: 'please add /types to the URL',
        result: null
      });
  }
  /* PASS */
  console.info('PARAM PASSED!')
  next();
}

async function PlaceTypes(req, res) {
  const token = req.get('Authorization').substring(7);
  const updating = req.query?.update !== undefined ? req.query.update : 'default';
  /* PASS */
  try {
    const decoded = jwt.verify(token, 'ch2-ps514');
    /* PASS */
    const User = new UsersService(decoded.documentId);
    /* PASS */
    const processTypes = await User.addPlaceTypes(req.body, updating);
    /* PASS */
    if (processTypes?.result === undefined) {
      return res.json({
        success: true,
        placesTypes: processTypes
      }).end();
    } else {
      return res.json({
        success: false,
        operations: processTypes
      });
    }
  } catch (error) {
    res.status(400)
      .append('X-Powered-By', 'Biger x Barjakoub')
      .json({
        success: false,
        message: "There is something wrong with the user token or any",
        error
      }).end();
  }
}

module.exports = { StorePreferences, GetPreferences, UpdatePreferences, PlaceTypesParamCheck, PlaceTypes };