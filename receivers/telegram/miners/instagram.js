const fetch = require('node-fetch');
const { NEW_INSTAGRAM_POST } = require('../events');
const { queryLatestInstagramPost, persistLatestInstagramPost } = require('../dataLayer');

const getInstagramMedia = async function getInstagramMedia() {
  const mediaResult = await fetch('https://www.instagram.com/garyvee/media/');

  if (mediaResult.status !== 200) {
    return [];
  }

  try {
    const jsonResult = await mediaResult.json();

    return jsonResult.items;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const getLatestPost = async function getLatestPost() {
  const posts = await getInstagramMedia();
  const [latestPost] = posts;

  return latestPost;
};

const FIVE_SECONDS = 5 * 1000;

class YoutubeMiner {
  constructor(eventEmitter) {
    this.minerInterval = null;
    this.eventEmitter = eventEmitter;
  }

  mine() {
    this.minerInterval = setInterval(async () => {
      const latestPost = await getLatestPost();

      if (!latestPost) {
        return;
      }

      const { id: latestPostId } = latestPost;
      const currentLatestPost = await queryLatestInstagramPost();
      const currentLatestPostId = currentLatestPost && currentLatestPost.postId;

      if (
        latestPostId
        && currentLatestPostId !== latestPostId
      ) {
        persistLatestInstagramPost(latestPost);

        // NOTIFY ALL SUBSCRIBERS
        this.eventEmitter.emit(NEW_INSTAGRAM_POST, latestPost);
      }
    }, FIVE_SECONDS);
  }

  stopMining() {
    clearInterval(this.minerInterval);
    this.minerInterval = null;
  }
}

module.exports = YoutubeMiner;
