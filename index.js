const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const routes = require('./route/api.js');
//set up express app
const app = express();

mongoose.connect('mongodb://localhost/ninjago');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api',require('./route/api'));

//error handling middleware

app.use(function(err,req,res,next)
{
  res.status(422).send({error:err.message});
});

//listen for request

app.listen(4000,function(){

console.log('now listening for request');
});
