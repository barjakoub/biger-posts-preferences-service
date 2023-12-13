const _cloudstorage = require('../../../config/cloud_storage/cloud-storage_init.js');
const { dateTime, fs_databases, FieldValue } = require('../../../config/firestore/firestore_init.js');
const uniques = require('../helpers/genDocId.js');

class PostService {
  #_posts = fs_databases.collection('community_posts');
  static #_bigerposts = _cloudstorage.bucket('biger-posts');
  static #posts = fs_databases.collection('community_posts');

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
    return storing;
  }

  async updatePost(updateData) {
    /**
     * only update title and text, other attribute will fixed next development
     */
    let postUpdateData = {
      dateUpdated: dateTime.serverTimestamp()
    };
    for (const [attr, value] of Object.entries(updateData)) {
      postUpdateData[attr] = value;
    }
    const updatingPost = await this.#_posts.doc(this.documentId).update(postUpdateData);
    /**
     * if any error occurs, just check and test it with '_writeTime' property
     */
    return updatingPost;
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
    }
    const uploadingFile = await this.#_bigerposts.upload(path, options);
    /* PASS */
    return uploadingFile;
  }
  /**
   * 
   * @param {Number} pageNumber Number of page requested
   * @returns 
   */
  static async getPostCollection(pageNumber) {
    /**
     * to return totalPages
     */
    const postCollectionsSize = (await this.#posts.get()).size;
    /**
     * probably get an error if totalPage < pageNumber {user request}
     */
    const totalPages = Math.ceil(postCollectionsSize / 20);

    if (pageNumber === 1) {
      return {
        totalPages,
        snapshot: await this.#posts.orderBy('dateCreated', 'desc').limit(20).get()
      };
    }
    if (pageNumber > totalPages) {
      return {
        error: true,
        message: `next page data is not available`
      }
    }
    const remainingCollection = (pageNumber - 1) * 20;
    const snapshot = await this.#posts
      .orderBy('dateCreated', 'desc')
      .startAfter((await this.#posts.orderBy('dateCreated', 'desc').get()).docs[remainingCollection - 1])
      .limit(20)
      .get();
    return {
      totalPages,
      snapshot
    };
  }

  static async like(postDocumentId) {
    const like = this.#posts.doc(postDocumentId).update({
      likes: FieldValue.increment(1)
    });

    return like;
  }
}

module.exports = PostService;