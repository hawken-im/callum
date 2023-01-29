const router = require('koa-router')();
const db = require('../utils/db');
const _ = require('lodash');

router.get('/', list);

async function list(ctx) {
  await db.read();
  const posts = db.data.posts;
  if (!ctx.query.raw) {
    ctx.body = await appendExtra(posts, {
      viewer: ctx.query.viewer
    });
  } else {
    ctx.body = posts;
  }
}

async function appendExtra(posts, options = {}) {
  await db.read();
  const { profiles, comments, likes } = db.data;
  return posts.map(post => {
    return {
      ...post,
      extra: {
        liked: options.viewer ? likes.find(like => like.to === post.id)?.value > 0 : false,
        profile: profiles.find(profile => profile.userAddress === post.userAddress) || { name: post.userAddress },
        likeCount: _.sumBy(likes.filter(like => like.to === post.id), like => like.value),
        commentCount: comments.filter(comment => comment.to === post.id).length
      }
    }
  });
}

module.exports = router;