const TelegramSender = require('../TelegramSender');
const { queryInstagramPostsSubscription, queryYoutubeSubscription } = require('../dataLayer');
const persistChatIfNotExists = require('../utils/persistChatIfNotExists');

async function handleStart(message) {
  const sender = new TelegramSender();
  const { chat } = message;

  await persistChatIfNotExists(chat);

  const youtubeSubscription = await queryYoutubeSubscription(chat.id);
  const instagramSubscription = await queryInstagramPostsSubscription(chat.id);

  const inlineKeyboard = [
    [{ text: 'Show wallpapers', callback_data: '/wallpapers' }],
    youtubeSubscription ?
      [{ text: 'Unsubscribe from Youtube videos', callback_data: '/youtubeUnsubscribe' }] :
      [{ text: 'Subscribe to new Youtube videos', callback_data: '/youtubeSubscribe' }],
    instagramSubscription ?
      [{ text: 'Unsubscribe from Instagram posts', callback_data: '/instagramPostsUnsubscribe' }] :
      [{ text: 'Subscribe to new Instagram posts', callback_data: '/instagramPostsSubscribe' }],
  ];

  sender.sendMessage(message.chat, 'What should I do for you?', {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard,
    }),
  });
}

module.exports = handleStart;
