const TelegramSender = require('../TelegramSender');
const {
  deleteChatFromInstagramPostsSubscriptions,
  queryInstagramPostsSubscription,
} = require('../dataLayer');

const handleInstagramPostsUnsubscribe = async (message) => {
  const { chat } = message;
  const sender = new TelegramSender();

  const subscribedChatId = await queryInstagramPostsSubscription(chat.id);

  if (!subscribedChatId) {
    await sender.sendMessage(chat, 'You are not subscribed to Instagram posts');

    return;
  }

  await deleteChatFromInstagramPostsSubscriptions(chat);
  await sender.sendMessage(chat, 'You have successfully unsubscribed from Gary\'s Instagram posts');
};

module.exports = handleInstagramPostsUnsubscribe;
