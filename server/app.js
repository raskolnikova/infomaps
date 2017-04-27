import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session'
var MongoStore = require('connect-mongo')(session);

import config from '../etc/config.json'


import {serverPort} from '../etc/config.json'

import * as connection from './utils/DataBaseUtils'

import * as dbDataSet from './utils/DataSet';
import * as dbChart from './utils/Chart';
import * as dbMap from './utils/Map';
import * as dbUser from './utils/User';
import * as dbScript from './utils/Script';



connection.setUpConnection();

const app = express();

//парсим  данные в json
app.use(bodyParser.json({limit: '30mb'}));

app.use(cors({origin: '*'}));

app.use(session({
    secret:'I write this fucking app',
    resave: false,
    saveUninitialized:false,
    store: new MongoStore({
        url:`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
    })
}))

//-----------------------------------------------------------------------
app.post('/login', (req, res, next) => {
    if (req.session.user) return res.redirect('/')
	dbUser.checkUser(req.body)
		.then(function(user){
			if(user){
				req.session.user = {id: user._id, name: user.username}
				res.redirect('/')
			} else {
				return next(error)
			}
		})
		.catch(function(error){
			return next(error)
		})
 
});

app.post('/registration', function(req, res, next) {
  dbUser.createUser(req.body).then(data => res.send(data))
  	 .then(function(result){
  	 	console.log("User created")
  	 })
  	.catch(function(err){
  		if (err.toJSON().code == 11000){
  			res.status(500).send("This email already exist")
  		}
  	})
});
 
app.post('/logout', function(req, res) {
	if (req.session.user) {
		delete req.session.user;
		res.redirect('/')
	}
});

app.get('/users', (req, res) => {
  dbUser.listUsers().then(data => res.send(data));
});

//-----------------------------------------------------------------------

app.get('/datasets', (req, res) => {
  dbDataSet.listDataSet().then(data => res.send(data));
});

app.post('/import', (req, res) => {
  dbDataSet.createDataSet(req.body).then(data => res.send(data));
});

app.delete('/datasets/:id', (req, res) => {
    dbDataSet.deleteDataSet(req.params.id).then(data => res.send(data));
});

//-----------------------------------------------------------------------


app.get('/scripts', (req, res) => {
  dbScript.listScripts().then(data => res.send(data));
});

app.get('/scripts/:id', (req, res) => {
    dbScript.getScriptById(req.params.id).then(data => res.send(data));
});

app.post('/scripts', (req, res) => {
 dbScript.createScript(req.body).then(data => res.send(data));
});

app.delete('/scripts/:id', (req, res) => {
   dbScript.deleteScript(req.params.id).then(data => res.send(data));
});

app.put('/scripts/:id', (req, res) => {
    dbScript.updateScript(req.params.id,req.body).then(data => res.send(data));
});

//-----------------------------------------------------------------------


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


//-----------------------------------------------------------------------


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

//-----------------------------------------------------------------------




const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
