const router = require('koa-router')();
const { assert, Errors, throws } = require('../utils/validator');
const SDK = require('rum-sdk-nodejs');

//router.post('/', sendTrx);
router.post('/', receiveContent);

router.get('/:trxId', get);

async function receiveContent(ctx) {
  const payload = ctx.request.body;
  assert(payload, Errors.ERR_IS_REQUIRED('payload'));
  console.log(`content received: ${payload}`);
  ctx.response.body = 'success';
}

// async function sendTrx(ctx) {
//   const payload = ctx.request.body;
//   assert(payload, Errors.ERR_IS_REQUIRED('payload'));
//   const group = SDK.cache.Group.list()[0];
//   assert(group, Errors.ERR_IS_REQUIRED('group'));
//   try {
//     const res = await SDK.chain.Trx.send(group.groupId, payload);
//     ctx.body = res;
//   } catch (err) {
//     console.log(err);
//     throws('ERR_IS_REQUEST_FAILED');
//   }
// }

async function get(ctx) {
  const group = SDK.cache.Group.list()[0];
  assert(group, Errors.ERR_IS_REQUIRED('group'));
  try {
    ctx.body = await SDK.chain.Trx.get(group.groupId, ctx.params.trxId);
  } catch (err) {
    console.log(err);
    throws('ERR_IS_REQUEST_FAILED');
  }
}

module.exports = router;