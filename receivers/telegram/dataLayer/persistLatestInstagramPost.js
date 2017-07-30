const persistLatestInstagramPost = async (pool, post) => {
  const client = await pool.connect();

  try {
    await client.query(
      `
        INSERT INTO instagram_posts (post_id, post_content)
        VALUES ($1, $2)
      `,
      [post.id, JSON.stringify(post)],
    );
  } finally {
    client.release();
  }
};

module.exports = persistLatestInstagramPost;
