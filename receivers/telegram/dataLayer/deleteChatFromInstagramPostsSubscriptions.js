const deleteChatFromInstagramPostsSubscriptions = async (pool, chat) => {
  const client = await pool.connect();

  try {
    await client.query(
      `
        DELETE FROM instagram_posts_subscriptions
        WHERE chat_id = $1;
      `,
      [chat.id],
    );
  } finally {
    client.release();
  }
};

module.exports = deleteChatFromInstagramPostsSubscriptions;
