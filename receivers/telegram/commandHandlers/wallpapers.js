const TelegramSender = require('../TelegramSender');

const wallpaperList = ['one', 'two', 'three'];

function handleWallpapers(message) {
    const sender = new TelegramSender();

    sender.sendMultipleMessages(message.chat, ...wallpaperList);
}

module.exports = handleWallpapers;