const SDK = require('rum-sdk-nodejs');
const sleep = require('../utils/sleep');
const handleProject = require('./handleProject');
// const handleComment = require('./handleComment');
// const handleLike = require('./handleLike');
// const handleProfile = require('./handleProfile');
// const handleDelete = require('./handleDelete');
// const handlePostEdit = require('./handlePostEdit');
const getTrxType = require('../utils/getTrxType');
const db = require('../utils/db');
const config = require('../config');
const moment = require('moment');


const LIMIT = 50;
let startTrx;

SDK.cache.Group.clear();
SDK.cache.Group.add(config.seedUrl);

module.exports = (duration) => {
  let stop = false;

  (async () => {
    await db.read();
    startTrx = db.data.startTrx;
    while (!stop) {
      try {
        const group = SDK.cache.Group.list()[0];
        const listOptions = {
          groupId: group.groupId,
          count: LIMIT,
        };
        
        if (startTrx) {
          listOptions.startTrx = startTrx;
        }
        const contents = await SDK.chain.Content.list(listOptions);
        console.log(`${moment().format('HH:mm:ss')}, fetched, got ${contents.length} contents`);
        if (contents.length > 0) {
          await pullContents(contents.sort((a, b) => a.TimeStamp - b.TimeStamp));
        }
      } catch (err) {
        console.log(err);
      }
      await sleep(duration);
    }
  })();
}

const pullContents = async (contents) => {
  try {
    await db.read();
    for (const content of contents) {
      try {
        const exist = db.data.contents.find(c => c.TrxId === content.TrxId);
        if (exist) {
          continue;
        }
        const type = getTrxType(content);
        switch(type) {
          case 'project': await handleProject(content); break;
          // case 'comment': await handleComment(content); break;
          // case 'like': await handleLike(content); break;
          // case 'profile': await handleProfile(content); break;
          // case 'delete': await handleDelete(content); break;
          // case 'edit': await handlePostEdit(content); break;
          default: console.log('unknown type'); console.log(content); break;
        }
        console.log(`${content.TrxId} ✅`);
      } catch (err) {
        console.log(content);
        console.log(err);
        console.log(`${content.TrxId} ❌ ${err.message}`);
      }
      db.data.contents.unshift(content);
      db.data.startTrx = content.TrxId;
      startTrx = db.data.startTrx;
      await db.write();
    }
  } catch (err) {
    console.log(err);
  }
}
