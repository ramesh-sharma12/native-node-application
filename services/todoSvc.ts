/// <reference path="../_references.d.ts" />

import ITodoModel = require('../models/ITodoModel');
import ITodo = require('../models/todo');
import Todo = require('../schema/todo');

export class TodoSvc
{        
    public constructor()
    {
        
    }

    public get(id : string, callback: (errr: Error, item: any) => any) : any{
         Todo.findById(id, function(err, data) {
            if (err) throw err;

            callback(err, data);            
        });
    }
    public getAll(callback: (errr: Error, item: any) => any) : any {
         Todo.find({}, function(err, data) {
            if (err) throw err;

            console.log('todo found...' + data.length);

            callback(err, data);           
        }); 
    }

    public create(obj : ITodo, callback: (errr: Error, item: any) => any){
        var todo = new Todo(obj);
        
         todo.save(function(err, data) {
            if (err) throw err;

            console.log('todo created!');
            callback(err, data)
        });   
    }

    public update(id: string, data : ITodo,callback: (errr: Error, item: any) => any){
       
        Todo.findByIdAndUpdate(id, data , function(err, user) {
            if (err) throw err;

            // we have the updated user returned to us
           console.log('todo updated!');
            callback(err, user);
        });
    }

    public delete(id : string, callback: (errr: Error, item: any) => any){        
        Todo.findByIdAndRemove(id, function(err, todo) {
            if (err) throw err;

            // delete him
            todo.remove(function(err) {
                if (err) throw err;

                    console.log('Todo successfully deleted!');
                    callback(err, null);
                });
        });
    }
}