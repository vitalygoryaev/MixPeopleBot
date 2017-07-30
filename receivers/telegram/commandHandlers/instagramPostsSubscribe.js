const TelegramSender = require('../TelegramSender');
const {
  queryLatestInstagramPost,
  persistChatToInstagramPostsSubscriptions,
  queryInstagramPostsSubscription,
} = require('../dataLayer');
const sendInstagramPost = require('../utils/sendInstagramPost');


const handleInstagramPostsSubscribe = async (message) => {
  const { chat } = message;
  const sender = new TelegramSender();

  const subscribedChatId = await queryInstagramPostsSubscription(chat.id);

  if (subscribedChatId) {
    await sender.sendMessage(chat, 'You are already receiving notifications about Gary\'s instagram posts');

    return;
  }

  await persistChatToInstagramPostsSubscriptions(chat);

  const latestPost = await queryLatestInstagramPost();

  await sender.sendMessage(chat, 'Now you will receive a notification each time Gary posts to Instagram');

  if (latestPost) {
    await sender.sendMessage(chat, 'Currently the latest post');
    await sendInstagramPost(sender, chat, latestPost.content);
  }
};

module.exports = handleInstagramPostsSubscribe;
