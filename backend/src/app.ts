import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
import postRouter from './routes/post-router'
import authRouter from './routes/auth-router'

const app: Express = express();
const port: number = 3000;

app.use(bodyParser.json())
app.use(cookieParser())

app.use(authRouter)
app.use(postRouter);

app.use(history())
app.use(express.static('public'))
app.use(express.static('dist-frontend'))
app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Pagina not found!");
})

app.listen(port, function() {
    console.log(`Listening on http://localhost:${port}`);
})
