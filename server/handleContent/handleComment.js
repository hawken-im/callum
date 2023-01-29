const db = require('../utils/db');
const SDK = require('rum-sdk-nodejs');
const { getSocketIo } = require('../socket');

module.exports = async (item) => {
  console.log('handle comment', item);
  await db.read();
  const {
    TrxId,
    Data: {
      object: {
        id,
        inreplyto,
        content
      }
    },
    SenderPubkey,
    TimeStamp,
  } = item;
  const comment = {
    trxId: TrxId,
    id,
    to: inreplyto.id,
    content,
    userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
    timestamp: parseInt(String(TimeStamp / 1000000), 10)
  };
  db.data.comments.push(comment);
  await db.write();
  getSocketIo().emit('comment', comment);
}
