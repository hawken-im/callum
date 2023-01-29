const router = require('koa-router')();
const db = require('../utils/db');

router.get('/', get);

async function get(ctx) {
  await db.read();
  ctx.body = {
    post: db.data.posts.length,
    content: db.data.contents.length,
    like: db.data.likes.length,
    comment: db.data.comments.length,
    profile: db.data.profiles.length,
  };
}

module.exports = router;