const queryAllInstagramPostsSubscriptions = async (pool) => {
  const client = await pool.connect();

  try {
    const subscriptionsResult = await client.query(
      `
        SELECT c.chat FROM instagram_posts_subscriptions igs
        JOIN chats c
        ON c.chat_id = igs.chat_id
      `,
    );
    const { rows } = subscriptionsResult;
    const chats = rows.map(({ chat }) => JSON.parse(chat));

    return chats;
  } catch (error) {
    return [];
  } finally {
    client.release();
  }
};

module.exports = queryAllInstagramPostsSubscriptions;
