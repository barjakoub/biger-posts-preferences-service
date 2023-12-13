class Preferences {
  static #send;
  constructor(data = null) {
    if (data === null) {
      return {}
    }
    this.data = data;
  }

  static All(prefdata) {
    Preferences.#send = {
      address: prefdata.address,
      route: prefdata.route,
      administrative_area_level_5: prefdata.administrative_area_level_5,
      administrative_area_level_4: prefdata.administrative_area_level_4,
      administrative_area_level_3: prefdata.administrative_area_level_3,
      administrative_area_level_2: prefdata.administrative_area_level_2,
      administrative_area_level_1: prefdata.administrative_area_level_1,
      postal_code: parseInt(prefdata.postal_code),
      country_code: prefdata.country_code || 'ID'
    }

    return this;
  }
  /**
   * 
   * @param {object} prefdata The object of preferences field.
   * @returns Formatted address based on prefdata.
   */
  static FormattedAddress(prefdata) {
    /* NEXT DEVELOPMENT: MAKE THE RIGHT FORMATTED ADDRESS IF ONE OF THE VALUE EVALUATES TO NULL VALUE */
    Preferences.#send = `${prefdata.route}, ${prefdata.administrative_area_level_5}, ${prefdata.administrative_area_level_4}, ${prefdata.administrative_area_level_3}, ${prefdata.administrative_area_level_2}, ${prefdata.administrative_area_level_1} ${prefdata.postal_code}, Indonesia`;

    return this;
  }
  /**
   * 
   * @param {Array} typesdata 
   * @returns {Array} This method return array of place types.
   */
  static PlaceTypes(typesdata) {
    Preferences.#send = {
      placeTypes: []
    };
    if (Array.isArray(typesdata)) {
      for (const type of typesdata) {
        Preferences.#send.placeTypes.push(type);
      }
    } else {
      Preferences.#send.placeTypes = typesdata;
    }

    return this;
  }

  static get() {
    return Preferences.#send;
  }
}
module.exports = Preferences;