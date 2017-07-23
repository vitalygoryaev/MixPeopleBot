const TelegramSender = require('../TelegramSender');

function handleStart(message) {
  const sender = new TelegramSender();

  sender.sendMessage(message.chat, 'What should I do for you?', {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Show wallpapers', callback_data: '/wallpapers' }],
        [{ text: 'Subscribe to new Youtube videos', callback_data: '/youtubeSubscribe' }],
        [{ text: 'Unsubscribe from Youtube uploads', callback_data: '/youtubeUnsubscribe' }],
      ],
    }),
  });
}

module.exports = handleStart;
