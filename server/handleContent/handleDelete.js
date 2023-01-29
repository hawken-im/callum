const db = require('../utils/db');
const { getSocketIo } = require('../socket');

module.exports = async (item) => {
  console.log('handle post delete', item);
  await db.read();
  const {
    Data: {
      object: {
        id,
      }
    },
  } = item;
  db.data.posts = db.data.posts.filter(post => post.id !== id)
  await db.write();
  getSocketIo().emit('postdelete', id);
}
