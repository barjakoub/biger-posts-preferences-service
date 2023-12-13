const { Storage } = require('@google-cloud/storage');

const _cloudstorage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.CLOUD_STORAGE
});

module.exports = _cloudstorage;

