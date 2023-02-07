const db = require('../utils/db');
const SDK = require('rum-sdk-nodejs');
const { socketIo } = require('../socket');

module.exports = async (item) => {
  console.log('handle solution data', item);
  await db.read();
  const {
    TrxId,
    Data: {
      object: {
        id,
        content,
        insolto,
      }
    },
    SenderPubkey,
    TimeStamp,
  } = item;
  const solution = {
    trxId: TrxId,
    id,
    to:insolto,
    content,
    userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
    timestamp: parseInt(String(TimeStamp / 1000000), 10)
  };
  db.data.solutions.unshift(solution);
  await db.write();
  socketIo().emit('solution', solution);
  console.log(`solution handled: ${solution.id}`)
}