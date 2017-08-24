const fetch = require('node-fetch');
const { NEW_FACEBOOK_POST } = require('../events');
const { queryLatestFacebookPost, persistLatestFacebookPost } = require('../dataLayer');

const facebookToken = process.env.FACEBOOK_TOKEN;

const getFacebookPosts = async function getFacebookPosts() {
  const postsResult = await fetch(`https://graph.facebook.com/v2.10/gary/posts?access_token=${facebookToken}&debug=all&fields=id%2Ccreated_time%2Cpermalink_url&format=json&limit=1&method=get&pretty=0&suppress_http_code=1`);

  if (postsResult.status !== 200) {
    return [];
  }

  try {
    const jsonResult = await postsResult.json();

    return jsonResult.data;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const getLatestPost = async function getLatestPost() {
  const posts = await getFacebookPosts();
  const [latestPost] = posts;

  return latestPost;
};

const REQUEST_INTERVAL = 5 * 1000;

class FacebookMiner {
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
      const currentLatestPost = await queryLatestFacebookPost();
      const currentLatestPostId = currentLatestPost && currentLatestPost.postId;

      if (
        latestPostId
        && currentLatestPostId !== latestPostId
      ) {
        persistLatestFacebookPost(latestPost);

        // NOTIFY ALL SUBSCRIBERS
        this.eventEmitter.emit(NEW_FACEBOOK_POST, latestPost);
      }
    }, REQUEST_INTERVAL);
  }

  stopMining() {
    clearInterval(this.minerInterval);
    this.minerInterval = null;
  }
}

module.exports = FacebookMiner;
