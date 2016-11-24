import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {serverPort} from '../etc/config.json'

import * as db from './utils/DataBaseUtils';

db.setUpConnection();

const app = express();

//парсим  данные в json
app.use(bodyParser.json());

app.use(cors({origin: '*'}));

app.get('/import', (req, res) => {
    db.listDataSet().then(data => res.send(data));
});

app.post('/import', (req, res) => {
  db.createDataSet(req.body).then(data => res.send(data));
});

app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});


app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
