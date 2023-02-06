const questionService = require('../service/questionService');
const router = require('koa-router')();
const {assert, Errors, throws} = require('../utils/validator');

const db = require('../utils/db');
const Validator = require('param-validator.js');

const questionModel = {
  type: {
    type: String,
    empty: false,
    regexp: /^(Question)$/
  },
  content: String
}
const questionValidator = new Validator(questionModel);
router.post('/', post);

router.get('/:trxId', get);

async function post(ctx) {
  const question = ctx.request.body;
  if (!questionValidator.test(question)) {
    throws('PARAMETER_ERROR');
  }
  // header中的键全小写
  const privateKey = ctx.header.privatekey;
  assert(privateKey, Errors.ERR_IS_REQUIRED("privatekey"));
  console.log(question);

  try {
    ctx.response.body = await questionService.addQuestion(privateKey, question);
  } catch (err) {
    console.error("Failed to send question to group ", err);
    throws('ERR_IS_REQUEST_FAILED');
  }
}
async function get(ctx) {
  try {
    ctx.body = await questionService.getQuestionById(ctx.params.trxId).then();
  } catch (err) {
    console.log(err);
    throws('ERR_IS_REQUEST_FAILED');
  }
}



module.exports = router;