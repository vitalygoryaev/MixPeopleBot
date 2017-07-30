const TelegramSender = require('../TelegramSender');
const {
  deleteChatFromYoutubeSubscriptions,
  queryYoutubeSubscription,
} = require('../dataLayer');

const handleYoutubeUnsubscribe = async (message) => {
  const { chat } = message;
  const sender = new TelegramSender();

  const subscribedChatId = await queryYoutubeSubscription(chat.id);

  if (!subscribedChatId) {
    await sender.sendMessage(chat, 'You are not subscribed to youtube uploads');

    return;
  }

  await deleteChatFromYoutubeSubscriptions(chat);
  await sender.sendMessage(chat, 'You have successfully unsubscribed from Gary\'s Youtube uploads');
};

module.exports = handleYoutubeUnsubscribe;
