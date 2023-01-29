import Koa from 'koa';
import http from 'http';
import Router from 'koa-router';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
//import { Question } from './model/Model.js';
import * as DB from './db/db.js';

const app = new Koa();
app.use(
  cors({
    credentials: true,
  }),
);

const router = new Router();

router.get('/greetings', async (ctx: { body: string }) => {
  ctx.body = 'Hello';
});

router.post('/api/trx', async (ctx) => {
  const content = ctx.request.body;
  console.log(content);
  const question = Question.builder()
    .id(Math.random().toString())
    .title(content.title)
    .content(rb.data)
    .build();
  console.log(question);
  DB.push(question);
  ctx.response.body = 'success';
});

app.use(bodyParser());
//app.use(router.routes(), router.allowedMethods());
app.use(router.routes());

app.on('error', function (err) {
  console.log(err);
});

http.createServer(app.callback()).listen(9000, () => {
  console.log(`server started on 9000`);
});
