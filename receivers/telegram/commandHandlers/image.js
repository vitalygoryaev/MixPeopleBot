const TelegramSender = require('../TelegramSender');

function handleImage(message) {
    const sender = new TelegramSender();

    sender.sendPhotoByUrl(message.chat, 'http://img.sxsw.com/2016/spg_images/PP91412.png');
}

module.exports = handleImage;