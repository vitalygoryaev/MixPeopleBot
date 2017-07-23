const queryChat = async (pool, chatId) => {
  const client = await pool.connect();

  try {
    const chatResult = await client.query(
      `
        SELECT chat FROM chats
        WHERE chat_id = $1
      `,
      [chatId],
    );
    const { rows: [{ chat: chatString }] } = chatResult;
    const chat = JSON.parse(chatString);

    return chat;
  } catch (error) {
    return null;
  } finally {
    client.release();
  }
};

module.exports = queryChat;
