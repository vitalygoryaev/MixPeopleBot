exports.up = async (db) => {
  await db.runSql(
    `
      CREATE TABLE chats (
        id SERIAL PRIMARY KEY,
        chat_id INT UNIQUE NOT NULL,
        chat TEXT NOT NULL
      )
    `,
  );

  return null;
};

exports.down = async (db) => {
  await db.runSql(
    `
      DROP TABLE chats;
    `,
  );

  return null;
};

exports._meta = {
  version: 1,
};
