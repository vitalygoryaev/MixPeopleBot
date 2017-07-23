const queryAllYoutubeSubscriptions = async (pool, chatId) => {
  const client = await pool.connect();

  try {
    const subscriptionsResult = await client.query(
      `
        SELECT c.chat FROM youtube_subscriptions ys
        JOIN chats c
        ON c.chat_id = ys.chat_id
      `,
      [chatId],
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

module.exports = queryAllYoutubeSubscriptions;
