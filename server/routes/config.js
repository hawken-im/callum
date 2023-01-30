const router = require('koa-router')();
const config = require('../config');

router.get('/', get);

async function get(ctx) {
  ctx.response.body = config.seedUrl;
}

module.exports = router;