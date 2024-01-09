import express, { Express } from 'express';
import history from 'connect-history-api-fallback';
import postRouter from './routes/post-router'

const app: Express = express();
const port: number = 3000;

app.use(history());
app.use(express.static('public'))
app.use(express.static('dist-frontend'))

app.use(postRouter);

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Pagina not found!");
})

app.listen(port, function() {
    console.log('Listening on port ' + port);
})
