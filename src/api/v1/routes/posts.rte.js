const posts = require('./_route.js');
const uploads = require('../helpers/request._file.js');
const { checkBucket, uploadFileToBucket } = require('../handlers/posts.hdlr.js');

posts.route('/posts')
  .post(uploadFileToBucket)
  /* checking bucket... */
  .get(checkBucket);

// (req, res) => {
//   /**
//    * @property filename or path
//    * @property size
//    * @property destination
//    */
//   console.info(req.file);
//   res.json({
//     message: "OK"
//   });
// }

module.exports = posts;