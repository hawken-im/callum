const router = require('koa-router')();
const config = require('../config');

router.get('/', get);

async function get(ctx) {
  console.log(`what exactly is a config: ${config.seedUrl}`)
  ctx.response.body = config.seedUrl;
}

module.exports = router;