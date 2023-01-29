const db = require('../utils/db');
const SDK = require('rum-sdk-nodejs');

module.exports = async (item) => {
  console.log('handle profile', item);
  await db.read();
  const {
    TrxId,
    Data: {
      object: {
        name
      }
    },
    SenderPubkey,
  } = item;
  db.data.profiles.unshift({
    trxId: TrxId,
    name,
    userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
  });
  await db.write();
}
