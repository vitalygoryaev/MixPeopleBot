const queryLatestYoutubeVideoId = async (pool) => {
  const client = await pool.connect();

  try {
    const queryResult = await client.query(
      `
        SELECT video_id 
        FROM youtube_videos
        ORDER BY created_at DESC
        LIMIT 1
      `,
    );

    const { rows: [{ video_id: currentLatestVideoId }] } = queryResult;

    return currentLatestVideoId;
  } catch (error) {
    return null;
  } finally {
    client.release();
  }
};

module.exports = queryLatestYoutubeVideoId;
