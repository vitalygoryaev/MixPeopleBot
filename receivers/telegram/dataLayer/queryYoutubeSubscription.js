const queryYoutubeSubscription = async (pool, chatId) => {
  const client = await pool.connect();

  try {
    const subscriptionResult = await client.query(
      `
        SELECT chat_id FROM youtube_subscriptions
        WHERE chat_id = $1
      `,
      [chatId],
    );
    const { rows: [{ chat_id: subscribedChatId }] } = subscriptionResult;

    return subscribedChatId;
  } catch (error) {
    return null;
  } finally {
    client.release();
  }
};

module.exports = queryYoutubeSubscription;
