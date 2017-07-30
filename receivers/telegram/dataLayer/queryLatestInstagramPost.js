const queryLatestInstagramPost = async (pool) => {
  const client = await pool.connect();

  try {
    const queryResult = await client.query(
      `
        SELECT post_id, post_content
        FROM instagram_posts
        ORDER BY created_at DESC
        LIMIT 1
      `,
    );

    const { rows: [{ post_id: postId, post_content: content }] } = queryResult;

    return {
      postId,
      content: JSON.parse(content),
    };
  } catch (error) {
    return null;
  } finally {
    client.release();
  }
};

module.exports = queryLatestInstagramPost;
