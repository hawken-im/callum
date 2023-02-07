const { Low, JSONFile } = require('@commonify/lowdb');
const db = new Low(new JSONFile('db.json'));
module.exports = db;

(async () => {
  await db.read();
  db.data ||= {
    projects: [],
    solutions: [],
    comments: [],
    likes: [],
    profiles: [],
    contents: [],
    questions:[],
    answers:[],
    replies:[]
  };
  await db.write();
})();