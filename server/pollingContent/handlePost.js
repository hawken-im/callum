const db = require('../utils/db');
const SDK = require('rum-sdk-nodejs');
const { getSocketIo } = require('../socket');

module.exports = async (item) => {
  console.log('handle post', item);
  await db.read();
  const {
    TrxId,
    Data: {
      object: {
        id,
        content,
      }
    },
    SenderPubkey,
    TimeStamp,
  } = item;
  const post = {
    trxId: TrxId,
    id,
    content,
    userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
    timestamp: parseInt(String(TimeStamp / 1000000), 10)
  };
  db.data.posts.unshift(post);
  await db.write();
  getSocketIo().emit('post', post);
}
