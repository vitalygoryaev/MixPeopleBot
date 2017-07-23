exports.up = async (db) => {
  await db.runSql(
    `
      CREATE TABLE youtube_videos (
        id SERIAL PRIMARY KEY,
        video_id VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
  );

  return null;
};

exports.down = async (db) => {
  await db.runSql(
    `
      DROP TABLE youtube_videos;
    `,
  );

  return null;
};

exports._meta = {
  version: 1,
};
