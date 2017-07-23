const { Pool } = require('pg');

const persistLatestYoutubeVideoId = require('./persistLatestYoutubeVideoId');
const queryLatestYoutubeVideoId = require('./queryLatestYoutubeVideoId');
const persistChatToYoutubeSubscriptions = require('./persistChatToYoutubeSubscriptions');
const deleteChatFromYoutubeSubscriptions = require('./deleteChatFromYoutubeSubscriptions');
const persistNewChat = require('./persistNewChat');
const queryChat = require('./queryChat');
const queryYoutubeSubscription = require('./queryYoutubeSubscription');
const queryAllYoutubeSubscriptions = require('./queryAllYoutubeSubscriptions');

const pool = new Pool();

module.exports = {
  persistLatestYoutubeVideoId: persistLatestYoutubeVideoId.bind(null, pool),
  queryLatestYoutubeVideoId: queryLatestYoutubeVideoId.bind(null, pool),
  persistChatToYoutubeSubscriptions: persistChatToYoutubeSubscriptions.bind(null, pool),
  deleteChatFromYoutubeSubscriptions: deleteChatFromYoutubeSubscriptions.bind(null, pool),
  persistNewChat: persistNewChat.bind(null, pool),
  queryChat: queryChat.bind(null, pool),
  queryYoutubeSubscription: queryYoutubeSubscription.bind(null, pool),
  queryAllYoutubeSubscriptions: queryAllYoutubeSubscriptions.bind(null, pool),
};
