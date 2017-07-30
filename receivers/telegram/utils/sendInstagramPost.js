const sendInstagramPost = async function sendInstagramPost(sender, chat, post) {
  return sender.sendMessage(chat, post.link);
};

module.exports = sendInstagramPost;
