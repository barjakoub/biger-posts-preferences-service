const PostService = require('../services/posts.svcs.js');
const jwt = require('jsonwebtoken');
const uniques = require('../helpers/genDocId.js');
const fs = require('fs');

async function checkBucket(req, res) {
  console.info(`checking bucket...`);
  const checking = await PostService.checkBucket();
  console.info(`is bucket exist? => ${checking}`);
  if (!checking) {
    return res.json({
      status: 'fail',
      ops: checking[0]
    });
  }

  res.json({
    status: 'success',
    result: checking[0]
  });
}

async function uploadFileToBucket(req, res) {
  console.log({
    from: 'handler',
    file: req.file
  });
  const token = req.get('Authorization').substring(7);
  const decoded = jwt.verify(token, 'ch2-ps514');
  /**
   * Create instance of PostService
   * @param {String} documentId User's documentId from decoded jsonwebtoken. 
   */
  const Post = new PostService(decoded.documentId);
  const metadata = {
    postId: `${decoded.email}${uniques()}`,
    documentId: `users/${decoded.documentId}`
  }
  // const path = `${req.file.destination}${req.file.filename}`; __DEFAULT__
  /**
   * CHECK DIRECTORY
   */
  console.info(`preview path: ${req.file.path} ?`);
  console.info(`current directory: ${__dirname}`);
  /**
   * Uploading image file to Cloud Storage...
   */
  console.info(`Uploading file user's request to Cloud Storage...`);
  const uploading = await PostService.uploadFile(metadata, req.file.path);
  /* PERFORM VERIFY IF CAN */
  /* storing community-posts data here */
  const postData = {
    documentId: decoded.documentId,
    title: req.body.title,
    text: req.body.text,
    email: decoded.email
  }
  const imageCloud = {
    name: uploading[1].name,
    publicUrl: uploading[0].publicUrl(),
    downloadMedia: uploading[1].mediaLink
  }
  console.info(`Storing post data to Cloud Firestore...`);
  const storingPost = await Post.createPosts(postData, imageCloud);
  /* VERIFY HERE NEXT */
  console.info(`deleting file on ${req.file.path}...`);
  /**
   * Deleting user's requests file after uploading to Cloud Storage
   */
  fs.unlinkSync(req.file.path);
  console.info(`Completed...`);
  // fs.unlink(req.file.path, (err) => {
  //   if (err) {
  //     console.info(err);
  //   }
  //   console.info(`${req.file.path} deleted...`);
  // });
  res.set({
    'X-Powered-By': 'Biger x Barjakoub',
    'GithubPage': 'github.com/barjakoub'
  })
    .status(201)
    .json({
      success: true,
      status: 'post added successfully!'
    });
}

async function updatePost(req, res) {
  const token = req.get('Authorization').substring(7);
  jwt.verify(token, 'ch2-ps514', (err, decoded) => {
    if (err) {
      return res.status(401)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          success: false,
          message: "There is something wrong with the user token"
        }).end();
    }
  });
  if (req.params.postDocumentId === undefined) {
    return res.status(400)
      .append('X-Powered-By', 'Biger x Barjakoub')
      .json({
        success: false,
        message: "postDocumentId must be included in request.params!"
      })
      .end();
  }
  const postInstance = new PostService(req.params.postDocumentId);
  const updatingPost = await postInstance.updatePost(req.body);

  res.json(updatingPost);
}

async function getPostCollections(req, res) {
  const page = req.query.page ?? 1;
  const gettingPostCollection = await PostService.getPostCollection(parseInt(page));
  if ('error' in gettingPostCollection) {
    return res.json(gettingPostCollection);
  }
  let posts = [];
  gettingPostCollection.snapshot.forEach(post => {
    posts.push({
      documentId: post.id,
      post: post.data()
    });
  })
  res.set({
    'X-Powered-By': 'Biger x Barjakoub',
    'GithubPage': 'github.com/barjakoub'
  })
    .status(200)
    .json({
      totalPages: gettingPostCollection.totalPages ?? 'firstPage',
      posts: posts
    })
    .end();
}

async function updateLike(req, res) {
  const token = req.get('Authorization').substring(7);
  jwt.verify(token, 'ch2-ps514', (err, decoded) => {
    if (err) {
      return res.status(401)
        .append('X-Powered-By', 'Biger x Barjakoub')
        .json({
          success: false,
          message: "There is something wrong with the user token"
        }).end();
    }
  });
  if (req.params.postDocumentId === undefined) {
    return res.status(400)
      .append('X-Powered-By', 'Biger x Barjakoub')
      .json({
        success: false,
        message: "postDocumentId must be included in request.params!"
      })
      .end();
  }
  const updatingLike = await PostService.like(req.params.postDocumentId);
  res.json(updatingLike);
}


module.exports = { checkBucket, uploadFileToBucket, getPostCollections, updatePost, updateLike };