const SDK = require('rum-sdk-nodejs');
const ulid = require('../utils/ulid');
const {assert, Errors, throws} = require('../utils/validator');

const db = require('../utils/db');


const getQuestionById = async function getQuestionById(trxId) {
  await db.read();
  return db.data.questions.find((item, index, arr) => {
    return item.id === trxId;
  });
}

const addQuestion = async function addQuestion(privateKey, question) {
  const group = SDK.cache.Group.list()[0];
  assert(group, Errors.ERR_IS_REQUIRED('group'));
  question.date = new Date();
  question.id = ulid.generateUlid(16);
  const res = await SDK.chain.Trx.create({
    data: {
      type: "Create",
      object: question
    },
    groupId: group.groupId,
    privateKey: privateKey
  });
  return res;
}

module.exports = {
  getQuestionById,
  addQuestion
};