const _cloudstorage = require('../../../config/cloud_storage/cloud-storage_init.js');
const { dateTime, fs_databases, FieldValue } = require('../../../config/firestore/firestore_init.js');
const uniques = require('../helpers/genDocId.js');

class PostService {
  #_posts = fs_databases.collection('community_posts');
  static #_bigerposts = _cloudstorage.bucket('biger-posts');
  constructor(documentId = null) {
    if (documentId === null) {
      return {};
    }
    this.documentId = documentId;
  }

  async createPosts(postData, cloudImage) {
    /* THIS SHOULD BE USE POSTS COLLECTIONS TO GET OBJECT FORMATTED */
    const structuredPostData = {
      postId: `bigpost${uniques()}`,
      userReference: `users/${postData.documentId}`,
      imageUrl: cloudImage.publicUrl,
      imageMedia: cloudImage.downloadMedia,
      imageName: cloudImage.name,
      title: postData.title,
      text: postData.text,
      likes: 0,
      publisher: postData.email,
      dateCreated: dateTime.serverTimestamp(),
      dateUpdated: dateTime.serverTimestamp()
    }
    const storing = await this.#_posts.add(structuredPostData);
    /* storing.id */
    console.info(storing);
    return storing;
  }

  static async checkBucket() {
    const checking = await this.#_bigerposts.exists();
    return checking;
  }

  static async uploadFile(metadata, path) {
    const extraxtPath = path.split('/');
    const options = {
      destination: `images/${extraxtPath[extraxtPath.length - 1]}`,
      metadata: metadata,
      // userProject: 'capstone-ch2-ps514'
    }
    const uploadingFile = await this.#_bigerposts.upload(path, options);
    /* PASS */
    return uploadingFile;
  }
}

module.exports = PostService;