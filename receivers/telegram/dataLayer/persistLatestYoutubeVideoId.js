const persistLatestYoutubeVideoId = async (pool, videoId) => {
  const client = await pool.connect();

  try {
    await client.query(
      `
        INSERT INTO youtube_videos (video_id) 
        VALUES ($1)
      `,
      [videoId],
    );
  } finally {
    client.release();
  }
};

module.exports = persistLatestYoutubeVideoId;
