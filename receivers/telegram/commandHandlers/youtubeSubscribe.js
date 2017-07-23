const TelegramSender = require('../TelegramSender');
const {
  queryLatestYoutubeVideoId,
  persistChatToYoutubeSubscriptions,
  queryYoutubeSubscription,
} = require('../dataLayer');
const persistChatIfNotExists = require('../utils/persistChatIfNotExists');

const handleYoutubeSubscribe = async (message) => {
  const { chat } = message;
  const sender = new TelegramSender();

  await persistChatIfNotExists(chat);

  const subscribedChatId = await queryYoutubeSubscription(chat.id);

  if (subscribedChatId) {
    await sender.sendMessage(chat, 'You are already receiving notifications about Gary\'s youtube uploads');

    return;
  }

  await persistChatToYoutubeSubscriptions(chat);

  const latestVideoId = await queryLatestYoutubeVideoId();

  if (latestVideoId) {
    await sender.sendMessage(chat, `Currently the latest video is https://www.youtube.com/watch?v=${latestVideoId}`);
  }

  await sender.sendMessage(chat, 'Now you will receive a notification each time Gary uploads a new video');
};

module.exports = handleYoutubeSubscribe;
