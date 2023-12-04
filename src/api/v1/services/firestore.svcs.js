const { dateTime, fs_databases } = require('../../../config/firestore/FS_init.js');

class FirestoreService {
  static #users = fs_databases.collection('users');
  constructor() {
    return {};
  }
}