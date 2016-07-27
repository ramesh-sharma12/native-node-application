/// <reference path="./typings/main.d.ts" />
/// <reference path="_references.d.ts" />

import express = require('express');
import open = require('open');
import cookieParser = require('cookie-parser');
import bodyParser =  require('body-parser');
import http = require('http');
import path = require('path');
import ejs = require('ejs');
import fs = require('fs-extra');
import mongoose = require('mongoose');

import IndexRoute = require('./routes/index');
import TodoRoute  = require('./routes/todo');

mongoose.connect('mongodb://localhost:27017/tododb', function (err:any) {
    if(err) throw new Error('Unable to connect to mongodb');

    console.log('connected to db');
    
    //var livereload = require('express-livereload')
    var activeUser = [];
    var userId = 1000;

    var app = express();

    //livereload(app, { watchDir  : __dirname });

    app.set('port', process.env.PORT || '3000');

    // Register our templating engine
    app.engine('html', ejs.renderFile);

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/');
    app.set('view cache', true);

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '/')));

    new IndexRoute.IndexRoute(app);
    new TodoRoute.TodoRoute(app);

    http.createServer(app).listen(app.get('port'), function () {

        fs.mkdirs(path.join(__dirname, '/partials'));
        fs.copy(path.join(__dirname + '/../partials'), path.join(__dirname, '/partials') , function (err) {
            if (err) return console.error(err);

            console.log('partials copied');               
        });

        fs.mkdirs(path.join(__dirname, '/views'));
        fs.copy(path.join(__dirname + '/../views'), path.join(__dirname, '/views') , function (err) {
            if (err) return console.error(err);

            open('http://localhost:3000/');     
        });     
    });
});

