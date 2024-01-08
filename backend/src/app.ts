import express, { Express } from 'express';
import history from 'connect-history-api-fallback';
import postRouter from './routes/post-router'

const app: Express = express();
const port: number = 3000;

app.use(history());

app.use(postRouter);

app.listen(port, function() {
    console.log('Listening on port ' + port);
})
