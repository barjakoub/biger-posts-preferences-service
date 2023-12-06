const { Storage } = require('@google-cloud/storage');

const _cloudstorage = new Storage({
  projectId: 'ch2-ps514',
  keyFilename: './src/config/cloud_storage/CloudStorage.json'
});

module.exports = _cloudstorage;
/*
const bucket = _cloudstorage.bucket('biger-posts');
bucket.exists((err, exists) => {
  if (err) {
    console.info(err);
    return {
      ops: err
    }
  }
  const options = {
    destination: 'images/insidefolder.png'
  }
  bucket.upload('test-upload.png', options, (error, file, response) => {
    if (error) {
      return console.info(error);
    }

    console.info(file.publicUrl());
    console.info(response);
  })
  console.info(exists);
});
*/
