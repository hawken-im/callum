const db = require('../utils/db');
const SDK = require('rum-sdk-nodejs');

module.exports = async (item) => {
  console.log('handle like', item);
  const {
    TrxId,
    Data: {
      type,
      object: {
        id,
      }
    },
    SenderPubkey,
    TimeStamp,
  } = item;
  await db.read();
  db.data.likes.unshift({
    trxId: TrxId,
    to: id,
    value: type === 'Like' ? 1 : -1,
    userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
    timestamp: parseInt(String(TimeStamp / 1000000), 10)
  });
  await db.write();
}
