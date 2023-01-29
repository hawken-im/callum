const router = require('koa-router')();
const db = require('../utils/db');
const _ = require('lodash');

router.get('/', list);

async function list(ctx) {
  await db.read();
  let comments = db.data.comments;
  if (ctx.query.to) {
    comments = comments.filter(comment => comment.to === ctx.query.to);
  }
  if (!ctx.query.raw) {
    ctx.body = await appendExtra(comments, {
      viewer: ctx.query.viewer
    });
  } else {
    ctx.body = comments;
  }
}

async function appendExtra(comments, options = {}) {
  await db.read();
  const { profiles, likes } = db.data;
  return comments.map(comment => {
    return {
      ...comment,
      extra: {
        liked: options.viewer ? likes.find(like => like.to === comment.id)?.value > 0 : false,
        profile: profiles.find(profile => profile.userAddress === comment.userAddress) || { name: comment.userAddress },
        likeCount: _.sumBy(likes.filter(like => like.to === comment.id), like => like.value),
      }
    }
  });
}

module.exports = router;