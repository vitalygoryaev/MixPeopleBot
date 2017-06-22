const TelegramSender = require('../TelegramSender');
const wallpaperList = require('./wallpaperList');

function handleImage(message) {
  const sender = new TelegramSender();

  const imageId = message.text.substr(message.text.indexOf(' ') + 1);

  if (!imageId) {
    return Promise.resolve();
  }

  const image = wallpaperList.filter(wallpaper => wallpaper.id === imageId)[0];

  if (!image) {
    return Promise.resolve();
  }

  return sender.sendImageByUrl(message.chat, image.url, image.markup);
}

module.exports = handleImage;
