const persistChatToYoutubeSubscriptions = async (pool, chat) => {
  const client = await pool.connect();

  try {
    await client.query(
      `
        INSERT INTO youtube_subscriptions (chat_id) 
        VALUES ($1)
      `,
      [chat.id],
    );
  } finally {
    client.release();
  }
};

module.exports = persistChatToYoutubeSubscriptions;
