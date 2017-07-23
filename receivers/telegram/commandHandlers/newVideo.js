const TelegramSender = require('../TelegramSender');
const { queryAllYoutubeSubscriptions } = require('../dataLayer/index');

const handleNewVideo = async (url) => {
  const sender = new TelegramSender();
  const message = `GARY JUST UPLOADED A NEW VIDEO!!! 🎉👍👍👇\n${url}`;
  const chatList = queryAllYoutubeSubscriptions();

  chatList.forEach(chat => sender.sendMessage(chat, message));
};

module.exports = handleNewVideo;
