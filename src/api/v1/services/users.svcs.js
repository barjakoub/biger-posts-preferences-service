const { dateTime, fs_databases, FieldValue } = require('../../../config/firestore/firestore_init.js');
const Preferences = require('../collections/preferences.coll.js');

class UsersService {
  #users = fs_databases.collection('users');
  constructor(documentId = null) {
    if (documentId == null) {
      return {};
    }
    this.documentId = documentId;
  }
  /**
   * 
   * @param {Boolean} formatted Optional user wants to add formatted address.
   * @returns User Preferences value, whether include formatted address or not.
   */
  async getPreferences(formatted = false) {
    const getPref = (await this.#users.doc(this.documentId).get()).data(); /* __DEFAULT__ .preferences */
    if (Object.keys(getPref).length !== 0) {
      if (formatted === true) {
        return {
          addressComponents: getPref.preferences,
          formattedAddress: Preferences.FormattedAddress(getPref.preferences).get(),
          placeTypes: getPref.placeTypes
        }
      } else {
        return {
          addressComponents: getPref.preferences,
          placeTypes: getPref.placeTypes
        };
      }
    } else {
      return {
        status: "fail",
        result: null,
        detail: getPref
      }
    }
  }

  async addPreferences(prefdata) {
    const addPref = await this.#users.doc(this.documentId).update({
      preferences: Preferences.All(prefdata).get(),
      dateUpdated: dateTime.serverTimestamp()
    });
    if ('_writeTime' in addPref) {
      return {
        status: "success",
        result: Preferences.All(prefdata).get()
      }
    } else {
      return {
        status: "fail",
        result: null
      }
    }
  }

  async updatePreferences(requestPref) {
    if (JSON.stringify(requestPref) === '{}') {
      return {
        status: 'no request data',
        result: null
      }
    }
    let reqPref = {};
    for (const [pref, value] of Object.entries(requestPref)) {
      if (value === '') {
        continue;
      } else if (pref == 'postal_code') {
        reqPref[`preferences.${pref}`] = parseInt(value);
        continue;
      }
      reqPref[`preferences.${pref}`] = value;
    }
    const updatePref = await this.#users.doc(this.documentId).update(reqPref);
    if ('_writeTime' in updatePref) {
      return this.getPreferences();
    } else {
      return {
        status: "fail",
        result: null
      }
    }
  }
  /**
   * 
   * @returns {Array} Return fied placeTypes as an array.
   */
  async getPlaceTypes() {
    const placeTypes = (await this.#users.doc(this.documentId).get()).data().placeTypes;
    // THIS RETURN MAY EITHER OBJECT OR ARRAY
    return placeTypes;
  }
  /**
   * 
   * @param {object} requestTypes Request body.types
   * @returns Object with placeTypes property followed Array value.
   */
  async addPlaceTypes(requestTypes, update = 'default') {
    if (JSON.stringify(requestTypes) === '{}') {
      return {
        status: 'no request data',
        result: null
      }
    }
    switch (update) {
      case 'default':
        const addTypes = await this.#users.doc(this.documentId).update(Preferences.PlaceTypes(requestTypes.types).get());
        if ('_writeTime' in addTypes) {
          /**
           * @returns {object} placeTypes property with Array value.
           */
          return await this.getPlaceTypes();
        } else {
          /**
           * @returns {object} {status, result} Always filled with 'fail' and null.
           */
          return {
            status: 'fail',
            result: null
          }
        }
      case 'rm':
        return this.updatePlaceTypes(requestTypes, true);
      case 'add':
        return this.updatePlaceTypes(requestTypes);
      default:
        return {
          status: 'fail',
          message: '@param {update} doesn\'t match anything',
          result: null
        }
    }
  }
  /**
   * 
   * @param {object} reqUpdateTypes Request body.placeTypes
   * @param {Boolean} remove Option to update whether delete of add value in Array
   * @returns Will return the new placeTypes field in Array.
   */
  async updatePlaceTypes(reqUpdateTypes, remove = false) {
    if (JSON.stringify(reqUpdateTypes) === '{}') {
      return {
        status: 'no request data',
        result: null
      }
    }
    let filteredTypes;
    if (Array.isArray(reqUpdateTypes.types)) {
      filteredTypes = reqUpdateTypes.types;
    } else {
      filteredTypes = [];
      filteredTypes.push(reqUpdateTypes.types);
    }
    switch (remove) {
      case false:
        const updateAddTypes = await this.#users.doc(this.documentId).update({
          placeTypes: FieldValue.arrayUnion(...filteredTypes)
        });
        if ('_writeTime' in updateAddTypes) {
          return await this.getPlaceTypes();
        } else {
          return {
            status: 'fail',
            result: null
          }
        }
      case true:
        const updateDelTypes = await this.#users.doc(this.documentId).update({
          placeTypes: FieldValue.arrayRemove(...filteredTypes)
        });
        if ('_writeTime' in updateDelTypes) {
          return await this.getPlaceTypes();
        } else {
          return {
            status: 'fail',
            result: null
          }
        }
      default:
        return {
          status: 'no suitable case',
          result: null
        }
    }
  }
}

module.exports = UsersService;