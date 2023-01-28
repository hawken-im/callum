const Koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
import { User, Reply, Question } from './model/Model';
import * as DB from './db/db';
const app = new Koa();
app.use(cors({
  credentials: true
}));

const router = new Router();

router.get('/greetings', async (ctx: { body: string; }) => { ctx.body = "Hello" });

router.post('/api/trx', async (ctx: { request: { body: any; }; response: { body: string; }; }) => {
  const rb = ctx.request.body;
  console.log(rb);
  const question = Question.builder().id(Math.random().toString()).title(rb.title).content(rb.data).build();
  console.log(question);
  DB.push(question);

  ctx.response.body = 'success';
})

app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

app.on('error', function (err: any) {
  console.log(err);
});

http.createServer(app.callback()).listen(9000, () => { console.log(`server started on 9000`) });