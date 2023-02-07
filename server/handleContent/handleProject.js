const SDK = require('rum-sdk-nodejs');
const { socketIo } = require('../socket');

module.exports = async (db, item) => {
  console.log('handle project data', item);
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
  const project = {
    trxId: TrxId,
    id,
    content,
    userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
    timestamp: parseInt(String(TimeStamp / 1000000), 10)
  };
  db.data.projects.unshift(project);
  socketIo().emit('project', project);
  console.log(`project handled: ${project.id}`)
}
