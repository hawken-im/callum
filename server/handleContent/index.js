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
const moment = require('moment');
const handleQuestion = require('./handleQuestion');

const LIMIT = 50;


module.exports = (duration) => {
  let stop = false;

  (async () => {
    while (!stop) {
      await db.read();
      try {
        const group = SDK.cache.Group.list()[0];
        const listOptions = {
          groupId: group.groupId,
          count: LIMIT,
        };
        if (db.data.startTrx) {
          listOptions.startTrx = db.data.startTrx;
        }
        const contents = await SDK.chain.Content.list(listOptions);
        console.log(`${moment().format('HH:mm:ss')}, fetched, got ${contents.length} contents`);
        if (contents.length > 0) {
          await pullContents(db, contents.sort((a, b) => a.TimeStamp - b.TimeStamp));
        }
      } catch (err) {
        console.log(err);
      }
      await sleep(duration);
    }
  })();
}

const pullContents = async (db, contents) => {
  try {
    let startTrx;
    for (const content of contents) {
      try {
        const exist = db.data.contents.find(c => c.TrxId === content.TrxId);
        if (exist) {
          continue;
        }
        const type = getTrxType(content);
        switch (type) {
          case 'project':
            await handleProject(db, content);
            break;
          case 'question':
            handleQuestion(db, content);
            break;
            // case 'comment': await handleComment(content); break;
            // case 'like': await handleLike(content); break;
            // case 'profile': await handleProfile(content); break;
            // case 'delete': await handleDelete(content); break;
            // case 'edit': await handlePostEdit(content); break;
          default:
            console.log('unknown type');
            console.log(content);
            break;
        }
        console.log(`${content.TrxId} ✅`);
      } catch (err) {
        console.log(content);
        console.log(err);
        console.log(`${content.TrxId} ❌ ${err.message}`);
      }
      db.data.contents.unshift(content);
      startTrx = content.TrxId;
    }
    db.data.startTrx = startTrx;
    await db.write();
  } catch (err) {
    console.log(err);
  }
}