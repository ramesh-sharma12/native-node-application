import {TodoSvc} from '../services/todoSvc';
import ITodo = require('../models/todo');

class TodoCtrl
{    

    todoSvc : TodoSvc;

    constructor() 
    {
        this.todoSvc = new TodoSvc();
    }

    public getAll(callback: (errr: Error, item: any) => any){
        this.todoSvc.getAll(callback);
    }    

    public getbyId(id : string,callback: (errr: Error, item: any) => any){                
        return this.todoSvc.get(id,callback);
    }

    public add(todo : ITodo, callback: (errr: Error, item: any) => any){
        return this.todoSvc.create(todo,callback);
    }

    public update(id : string, data : ITodo,callback: (errr: Error, item: any) => any){
         return this.todoSvc.update(id, data,callback);
    }

    public remove(id : string,callback: (errr: Error, item: any) => any){
        return this.todoSvc.delete(id,callback);
    }
}

export = TodoCtrl;

