const Koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(cors({
    credentials: true
}));

const router = new Router();

// async function getContent(ctx) {
//     console.log(ctx);
// };


router.get('/greetings',async (ctx) => {ctx.body = "Hello"});

router.post('/api/trx', async (ctx) => {
    const rb = ctx.request.body;
    console.log(rb);
    ctx.response.body = 'success';
})

app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

app.on('error', function (err) {
    console.log(err)
});

http.createServer(app.callback()).listen(9000,()=>{console.log(`server started on 9000`)});
