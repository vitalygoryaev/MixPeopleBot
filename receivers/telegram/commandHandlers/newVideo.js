const TelegramSender = require('../TelegramSender');

const chatList = [{
  id: 94063743,
  first_name: 'Vitaly',
  last_name: 'Goryaev',
  username: 'vitalygoryaev',
  type: 'private',
}];

function handleNewVideo(url) {
  const sender = new TelegramSender();
  const message = `GARY JUST UPLOADED A NEW VIDEO!!! 🎉👍👍👇\n${url}`;

  chatList.forEach(chat => sender.sendMessage(chat, message));
}

module.exports = handleNewVideo;
