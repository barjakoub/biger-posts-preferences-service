const { Firestore, FieldValue } = require('@google-cloud/firestore');

const dateTime = Firestore.FieldValue;
const fs_databases = new Firestore({
  projectId: process.env.PROJECT_ID || 'capstone-ch2-ps514',
  keyFilename: process.env.PATH_KEY || './src/config/firestore/Firestore.json'
});

module.exports = { dateTime, fs_databases, FieldValue };