function echoHandler(telegramApi, message) {
    telegramApi.sendMessage(message.chat, message.text);
}

module.exports = echoHandler;