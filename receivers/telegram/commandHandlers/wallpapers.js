const TelegramSender = require('../TelegramSender');
const wallpaperList = require('./wallpaperList');

function handleWallpapers(message) {
  const sender = new TelegramSender();

  return sender.sendMultipleImages(message.chat, ...wallpaperList);
}

module.exports = handleWallpapers;
