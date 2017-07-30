const persistChatToInstagramPostsSubscriptions = async (pool, chat) => {
  const client = await pool.connect();

  try {
    await client.query(
      `
        INSERT INTO instagram_posts_subscriptions (chat_id) 
        VALUES ($1)
      `,
      [chat.id],
    );
  } finally {
    client.release();
  }
};

module.exports = persistChatToInstagramPostsSubscriptions;
