const SDK = require('rum-sdk-nodejs');
const { socketIo } = require('../socket');

module.exports = async (db, item) => {
  const {
    TrxId,
    Data: {
      object: {
        id,
        content,
        date
      }
    },
    SenderPubkey,
    TimeStamp,
  } = item;
  const question = {
    trxId: TrxId,
    id: id,
    content,
    date,
    userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
    timestamp: parseInt(String(TimeStamp / 1000000), 10)
  };
  
  db.data.questions.push(question);
  // TODO
  // socketIo().emit('project', project);
  console.log(`project handled: ${question.id}`)
}
