const {
  queryChat,
  persistNewChat,
} = require('../dataLayer');

const persistChatIfNotExists = async (chat) => {
  try {
    const persistedChat = await queryChat(chat.id);

    if (!persistedChat) {
      await persistNewChat(chat);
    }
  } catch (error) {
    await persistNewChat(chat);
  }
};

module.exports = persistChatIfNotExists;
