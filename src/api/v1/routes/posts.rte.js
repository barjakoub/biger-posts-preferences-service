const posts = require('./_route.js');
const { checkBucket, uploadFileToBucket, getPostCollections, updatePost, updateLike } = require('../handlers/posts.hdlr.js');

posts.route('/posts/:postDocumentId?')
  .all((req, res, next) => {
    console.info('VERIFYING_USER_AUTHORIZATION...');
    if (req.get('Authorization') === undefined || req.get('Authorization').substring(0, 6) !== 'Bearer') {
      console.info('AUTHORIZATION_FAIL!');
      return res.status(401)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          message: 'no authorization header',
        });
    } // check if header[Authorization] starting with prefix Bearer
    console.info('SUCCESS...');
    next()
  })
  .post(uploadFileToBucket)
  .get(getPostCollections)
  .patch(updatePost)
  .put(updateLike);

module.exports = posts;