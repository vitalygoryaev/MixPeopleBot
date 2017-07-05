const TelegramSender = require('../TelegramSender');

const text = 'choose device type';
const markup = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'for mobile 📱', callback_data: '/wallpapers_mobile' }],
      [{ text: 'for desktop 🖥️', callback_data: '/wallpapers_desktop' }],
    ],
  }),
};

function handleWallpaperCategory(message) {
  const sender = new TelegramSender();

  return sender.sendMessage(message.chat, text, markup);
}

module.exports = handleWallpaperCategory;
