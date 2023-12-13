const { Firestore, FieldValue } = require('@google-cloud/firestore');

const dateTime = Firestore.FieldValue;
const fs_databases = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.FIRESTORE
});

module.exports = { dateTime, fs_databases, FieldValue };