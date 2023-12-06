const multer = require('multer');
const unique = require('./genDocId.js');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.info(file);
    callback(null, 'uploads/');
  },
  /* GENERATING FILENAME USING EMAIL AND NANOID */
  filename: (req, file, callback) => {
    const type = file.mimetype.split('/');
    const decoded = jwt.verify(req.get('Authorization').substring(7), 'ch2-ps514');
    const naming = `${decoded.email}${unique()}.${type[type.length - 1]}`;
    callback(null, naming);
  }
});

const uploads = multer({
  storage: storage,
}).single('post_pict');

module.exports = uploads;