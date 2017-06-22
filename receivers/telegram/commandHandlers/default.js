const TelegramSender = require('../TelegramSender');

function handleDefault(message) {
  const sender = new TelegramSender();

  const rootCommandList = Object.keys(require('../tree/root')).filter(key => key.indexOf('/') === 0);

  sender.sendMultipleMessages(
    message.chat,
    'sorry we didn\'t recognize your intent',
    'here\'s the list of available commands:',
    ...rootCommandList,
  );
}

module.exports = handleDefault;
