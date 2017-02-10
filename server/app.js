import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {serverPort} from '../etc/config.json'

import * as connection from './utils/DataBaseUtils'

import * as dbDataSet from './utils/DataSet';
import * as dbChart from './utils/Chart';
import * as dbMap from './utils/Map';


connection.setUpConnection();

const app = express();

//парсим  данные в json
app.use(bodyParser.json({limit: '30mb'}));

app.use(cors({origin: '*'}));

app.get('/datasets', (req, res) => {
  dbDataSet.listDataSet().then(data => res.send(data));
});

app.post('/import', (req, res) => {
  dbDataSet.createDataSet(req.body).then(data => res.send(data));
});

app.delete('/datasets/:id', (req, res) => {
    dbDataSet.deleteDataSet(req.params.id).then(data => res.send(data));
});


app.get('/charts', (req, res) => {
  dbChart.listChart().then(data => res.send(data));
});

app.get('/charts/:id', (req, res) => {
    dbChart.getChartById(req.params.id).then(data => res.send(data));
});

app.post('/charts', (req, res) => {
  dbChart.createChart(req.body).then(data => res.send(data));
});

app.delete('/charts/:id', (req, res) => {
    dbChart.deleteChart(req.params.id).then(data => res.send(data));
});

app.put('/charts/:id', (req, res) => {
    dbChart.updateChart(req.params.id,req.body).then(data => res.send(data));
});


app.get('/maps', (req, res) => {
  dbMap.listMap().then(data => res.send(data));
});

app.get('/maps/:id', (req, res) => {
    dbMap.getMapById(req.params.id).then(data => res.send(data));
});

app.post('/maps', (req, res) => {
  dbMap.createMap(req.body).then(data => res.send(data));
});

app.delete('/maps/:id', (req, res) => {
    dbMap.deleteMap(req.params.id).then(data => res.send(data));
});

app.put('/maps/:id', (req, res) => {
    dbMap.updateMap(req.params.id,req.body).then(data => res.send(data));
});


const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
