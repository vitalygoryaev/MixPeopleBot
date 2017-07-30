exports.up = async (db) => {
  await db.runSql(
    `
      CREATE TABLE instagram_posts (
        id SERIAL PRIMARY KEY,
        post_id VARCHAR(50) UNIQUE NOT NULL,
        post_content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
  );

  return null;
};

exports.down = async (db) => {
  await db.runSql(
    `
      DROP TABLE instagram_posts;
    `,
  );

  return null;
};

exports._meta = {
  version: 1,
};
