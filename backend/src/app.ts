import express, { Express } from 'express';

const app: Express = express();
const port: number = 3000;

app.listen(port, function() {
    console.log('Listening on port ' + port);
})
