const TelegramSender = require('../TelegramSender');

function echoHandler(message) {
    const sender = new TelegramSender();

    sender.sendMessage(message.chat, message.text);
}

module.exports = echoHandler;