import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {serverPort} from '../etc/config.json'

import * as connection from './utils/DataBaseUtils'

import * as db from './utils/DataSet';

connection.setUpConnection();

const app = express();

//парсим  данные в json
app.use(bodyParser.json({limit: '30mb'}));

app.use(cors({origin: '*'}));

app.get('/datasets', (req, res) => {
  db.listDataSet().then(data => res.send(data));
});

app.post('/import', (req, res) => {
  db.createDataSet(req.body).then(data => res.send(data));
});

app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});


app.delete('/datasets/:id', (req, res) => {
    db.deleteDataSet(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
