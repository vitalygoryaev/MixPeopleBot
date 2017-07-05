const TelegramSender = require('../TelegramSender');

function handleStart(message) {
  const sender = new TelegramSender();

  sender.sendMessage(message.chat, 'What should I do for you?', {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Show wallpapers', callback_data: '/wallpapers' }],
      ],
    }),
  });
}

module.exports = handleStart;
