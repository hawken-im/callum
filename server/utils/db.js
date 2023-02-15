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
  };
  await db.write();
})();

// id: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   primaryKey: true,
//   autoIncrement: true
// },
// name: {
//   type: Sequelize.STRING,
//   allowNull: false
// },
// avatar: {
//   type: Sequelize.TEXT,
//   defaultValue: ''
// },
// groupId: {
//   type: Sequelize.STRING,
//   allowNull: false
// },
// userAddress: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },
// updatedAt: {
//   type: Sequelize.DATE,
//   defaultValue: Sequelize.NOW
// }