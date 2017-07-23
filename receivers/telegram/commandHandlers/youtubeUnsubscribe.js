const TelegramSender = require('../TelegramSender');
const {
  deleteChatFromYoutubeSubscriptions,
  queryYoutubeSubscription,
} = require('../dataLayer');
const persistChatIfNotExists = require('../utils/persistChatIfNotExists');

const handleYoutubeSubscribe = async (message) => {
  const { chat } = message;
  const sender = new TelegramSender();

  await persistChatIfNotExists(chat);

  const subscribedChatId = await queryYoutubeSubscription(chat.id);

  if (!subscribedChatId) {
    await sender.sendMessage(chat, 'You are not subscribed to youtube uploads');

    return;
  }

  await deleteChatFromYoutubeSubscriptions(chat);
  await sender.sendMessage(chat, 'You have successfully unsubscribed from Gary\'s Youtube uploads');
};

module.exports = handleYoutubeSubscribe;
