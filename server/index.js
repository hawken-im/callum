const Koa = require('koa');
const http = require('http');
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const cors = require('@koa/cors');
const router = require('koa-router')();
const serve = require('koa-static');
const views = require('koa-views');
const Socket = require('./socket');
//const pollingContent = require('./pollingContent');

const trx = require('./routes/trx');

// const post = require('./routes/post');
// const comment = require('./routes/comment');
// const profile = require('./routes/profile');
// const like = require('./routes/like');
// const content = require('./routes/content');
// const summary = require('./routes/summary');
// const config = require('./routes/config');

const {
  errorHandler,
  extendCtx
} = require('./middleware/api');

const app = new Koa();
const port = 9000;
 
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(cors({
  credentials: true
}));
app.use(views(__dirname + '/build'));
app.use(serve('build', {
  maxage: 365 * 24 * 60 * 60,
  gzip: true
}));

router.all('(.*)', errorHandler);
router.all('(.*)', extendCtx);

router.use('/favicon.ico', async (ctx) => ctx.body = true);
router.use('/api/ping', async (ctx) => ctx.body = 'pong');
router.use('/api/trx', trx.routes(), trx.allowedMethods());

// router.use('/api/posts', post.routes(), post.allowedMethods());
// router.use('/api/comments', comment.routes(), comment.allowedMethods());
// router.use('/api/profiles', profile.routes(), profile.allowedMethods());
// router.use('/api/likes', like.routes(), like.allowedMethods());
// router.use('/api/contents', content.routes(), content.allowedMethods());
// router.use('/api/summary', summary.routes(), summary.allowedMethods());
// router.use('/api/config', config.routes(), config.allowedMethods());

app.use(router.routes(), router.allowedMethods());

app.on('error', function (err) {
  console.log(err)
});

const server = http.createServer(app.callback());
Socket.init(server);
server.listen(port, () => {
  console.log(`Node.js v${process.versions.node}`);
  console.log(`Server run at ${port}`);
  // setTimeout(() => {
  //   pollingContent(2000);
  // }, 2000);
});