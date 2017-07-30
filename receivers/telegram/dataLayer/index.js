const { Pool } = require('pg');

const persistNewChat = require('./persistNewChat');
const queryChat = require('./queryChat');

const persistLatestYoutubeVideoId = require('./persistLatestYoutubeVideoId');
const queryLatestYoutubeVideoId = require('./queryLatestYoutubeVideoId');
const persistChatToYoutubeSubscriptions = require('./persistChatToYoutubeSubscriptions');
const deleteChatFromYoutubeSubscriptions = require('./deleteChatFromYoutubeSubscriptions');
const queryYoutubeSubscription = require('./queryYoutubeSubscription');
const queryAllYoutubeSubscriptions = require('./queryAllYoutubeSubscriptions');

const persistLatestInstagramPost = require('./persistLatestInstagramPost');
const queryLatestInstagramPost = require('./queryLatestInstagramPost');
const persistChatToInstagramPostsSubscriptions = require('./persistChatToInstagramPostsSubscriptions');
const deleteChatFromInstagramPostsSubscriptions = require('./deleteChatFromInstagramPostsSubscriptions');
const queryInstagramPostsSubscription = require('./queryInstagramPostsSubscription');
const queryAllInstagramPostsSubscriptions = require('./queryAllInstagramPostsSubscriptions');

const pool = new Pool();

module.exports = {
  persistNewChat: persistNewChat.bind(null, pool),
  queryChat: queryChat.bind(null, pool),

  persistLatestYoutubeVideoId: persistLatestYoutubeVideoId.bind(null, pool),
  queryLatestYoutubeVideoId: queryLatestYoutubeVideoId.bind(null, pool),
  persistChatToYoutubeSubscriptions: persistChatToYoutubeSubscriptions.bind(null, pool),
  deleteChatFromYoutubeSubscriptions: deleteChatFromYoutubeSubscriptions.bind(null, pool),
  queryYoutubeSubscription: queryYoutubeSubscription.bind(null, pool),
  queryAllYoutubeSubscriptions: queryAllYoutubeSubscriptions.bind(null, pool),

  persistLatestInstagramPost: persistLatestInstagramPost.bind(null, pool),
  queryLatestInstagramPost: queryLatestInstagramPost.bind(null, pool),
  persistChatToInstagramPostsSubscriptions: persistChatToInstagramPostsSubscriptions.bind(null, pool),
  deleteChatFromInstagramPostsSubscriptions: deleteChatFromInstagramPostsSubscriptions.bind(null, pool),
  queryInstagramPostsSubscription: queryInstagramPostsSubscription.bind(null, pool),
  queryAllInstagramPostsSubscriptions: queryAllInstagramPostsSubscriptions.bind(null, pool),
};
