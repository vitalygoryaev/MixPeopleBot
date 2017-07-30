const TelegramSender = require('../TelegramSender');
const { queryAllInstagramPostsSubscriptions } = require('../dataLayer/index');
const sendInstagramPost = require('../utils/sendInstagramPost');

const handleNewInstagramPost = async (post) => {
  const sender = new TelegramSender();
  const preMessage = 'GARY JUST POSTED ON INSTA!!! 🎉👍👍👇\n';
  const chatList = await queryAllInstagramPostsSubscriptions();

  chatList.forEach(async (chat) => {
    sender.sendMessage(chat, preMessage)
      .then(() => sendInstagramPost(post));
  });
};

module.exports = handleNewInstagramPost;
