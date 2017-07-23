const persistNewChat = async (pool, chat) => {
  const client = await pool.connect();

  try {
    await client.query(
      `
        INSERT INTO chats (chat_id, chat) 
        VALUES ($1, $2)
      `,
      [chat.id, JSON.stringify(chat)],
    );
  } finally {
    client.release();
  }
};

module.exports = persistNewChat;
