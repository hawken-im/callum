const db = require('../utils/db');
const SDK = require('rum-sdk-nodejs');

module.exports = async (item) => {
    console.log('handle profile data', item);
    await db.read();
    const {
      TrxId,
      Data: {
        object: {
          name,
          image,
        }
      },
      SenderPubkey,
    } = item;
    const profile = {
      trxId: TrxId,
      userAddress: SDK.utils.pubkeyToAddress(SenderPubkey),
      groupId: '',
      updatedAt: Date.now(),
    };
    if (name) {
        profile.name = name;
    };
    if (image && image.length) {
    const img = image[0];
    const mediaType = img.mediaType
    const content = img.content
    const url = `data:${mediaType};base64,${content}`
    profile.avatar = url;
    };
    db.data.profiles.unshift(profile);
    await db.write();
    console.log(`profile handled: ${profile.id}`);
  }