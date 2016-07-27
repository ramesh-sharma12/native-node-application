/// <reference path='../_references.d.ts' />

import {Express, Router, Request, Response} from 'express';
import TodoCtrl = require('../controllers/todo');
import ITodo = require('../models/todo');

export class TodoRoute {   
    app: Express;

    constructor(app : Express)
    {   
        var todoCtrl = new TodoCtrl();

        app.get('/todo', function(req, res) {
            todoCtrl.getAll(function (err, result) {              
                 res.render('views/todo/index', { todos: result  , todo : []});
            });           
        });

        app.get('/todo/:id', function(req, res) {
            var id = req.params.id;
            todoCtrl.getbyId(id, function (err, result) { 
                console.log("todo details..", result);

                res.render('views/todo/details', { todo: result });
            });
        });

        app.get('/todo/edit/:id', function(req, res) {
            var id = req.params.id;
            todoCtrl.getbyId(id, function (err, result) {              
                 res.render('views/todo/edit', { todo: result });
            });
        });

        app.post('/todo', function(req, res) {         
            var todo = <ITodo>{
                title:req.body.title,
                description: req.body.description,
                createDate : new Date(),
                status : true,
                completedOn : null
            };

            todoCtrl.add(todo,function (err, result) {              
                 res.redirect('/todo');
            });            
        });

        app.post('/todo/:id', function(req, res) {
              var id = req.params.id;
                var todo = <ITodo>{
                    _id:id,
                    title:req.body.title,
                    description: req.body.description,
                    createDate : new Date(),
                    status : true,
                    completedOn : null
                };                       

              todoCtrl.update(id,todo, function (err, result) {

                  console.log("todo...post....", result);     

                   res.redirect('/todo/'+ id);
              });           
        });

        app.get('/todo/delete/:id', function(req, res) {
             var id = req.params.id;
            todoCtrl.remove(id,function (err, result) {              
                res.redirect('/todo');
            });           
        });
    }
}