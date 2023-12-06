const PostService = require('../services/posts.svcs.js');
const jwt = require('jsonwebtoken');
const uniques = require('../helpers/genDocId.js');
const fs = require('fs');

async function checkBucket(req, res) {
  const checking = await PostService.checkBucket();
  console.info(checking);
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
  const token = req.get('Authorization').substring(7);
  const decoded = jwt.verify(token, 'ch2-ps514');
  /* initiate instance */
  const Post = new PostService(decoded.documentId);
  const metadata = {
    postId: `${decoded.email}${uniques()}`,
    documentId: `users/${decoded.documentId}`
  }
  const path = `${req.file.destination}${req.file.filename}`;
  /* PASS */
  const uploading = await PostService.uploadFile(metadata, path);
  /* PERFORM VERIFY IF CAN */
  console.info(uploading[1]);
  console.info(uploading[0].publicUrl());
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
  const storingPost = await Post.createPosts(postData, imageCloud);
  /* VERIFY HERE NEXT */
  console.info(storingPost);
  console.info(storingPost.id);
  /* TEST DELETE HERE */
  fs.unlink(path, (err) => {
    if (err) {
      console.info(err);
    }
    console.info(`${path} deleted...`);
  });

  res.json({
    success: true,
    status: 'post added successfully!'
  });
}


module.exports = { checkBucket, uploadFileToBucket };