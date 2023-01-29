const router = require('koa-router')();
const db = require('../utils/db');

router.get('/', list);
router.get('/:userAddress', get);

async function list(ctx) {
  await db.read();
  ctx.body = db.data.profiles;
}

async function get(ctx) {
  await db.read();
  const { profiles } = db.data;
  const profile = profiles.find(profile => profile.userAddress === ctx.params.userAddress)
  ctx.body = profile || { name: ctx.params.userAddress };
}

module.exports = router;