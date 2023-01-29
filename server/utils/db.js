const { Low, JSONFile } = require('@commonify/lowdb');
const db = new Low(new JSONFile('db.json'));
module.exports = db;

(async () => {
  await db.read();
  db.data ||= {
    posts: [],
    comments: [],
    likes: [],
    profiles: [],
    contents: [],
  };
  await db.write();
})();