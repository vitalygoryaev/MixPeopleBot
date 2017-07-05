const TelegramSender = require('../TelegramSender');
const wallpaperList = require('../resources/desktopWallpaperList.json');

const getFullsizeDownloadMarkup = imageId => ({
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'get fullsize', callback_data: `/file ${imageId}` }],
    ],
  }),
});

const getWallpaperWithReplyMarkup = wallpaper => ({
  ...wallpaper,
  markup: getFullsizeDownloadMarkup(wallpaper.id),
});

function handleWallpapersDesktop(message) {
  const sender = new TelegramSender();

  return sender.sendMultipleImages(message.chat, ...wallpaperList.map(getWallpaperWithReplyMarkup));
}

module.exports = handleWallpapersDesktop;
