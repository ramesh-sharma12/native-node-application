/// <reference path='../_references.d.ts' />

'use strict';

import {Express, Router, Request, Response} from 'express';

export class IndexRoute
{   
    app: Express;

    constructor(app : Express)
    {   
        app.get('/', function(req, res) {
            res.render('views/index');
        });

        app.get('/home', function(req, res) {
            res.render('views/index');
        });

        app.get('/aboutUs', function(req, res) {
            res.render('views/about');
        });
    }
}
