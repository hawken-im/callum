const router = require('koa-router')();
const db = require('../utils/db');

router.get('/', list);

async function list(ctx) {
  await db.read();
  ctx.body = db.data.contents;
}

module.exports = router;