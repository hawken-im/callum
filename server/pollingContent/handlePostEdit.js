const db = require('../utils/db');
const { getSocketIo } = require('../socket');

module.exports = async (item) => {
  console.log('handle post update', item);
  await db.read();
  const {
    Data: {
      object: {
        id,
      },
      result: {
        content,
      }
    },
  } = item;
  const post = db.data.posts.find(v => v.id === id)
  if (post) {
    post.content = content
    await db.write();
    getSocketIo().emit('postedit', post);
  }
}
