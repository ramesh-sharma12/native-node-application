/// <reference path="../_references.d.ts" />
'use strict';

// grab the things we need
import mongoose = require('mongoose');
import ITodoModel = require('../models/ITodoModel');

// create a schema
var todoSchema = new mongoose.Schema({
  title : String,
  description : String,
  createDate : Date,
  status : Boolean,
  completedOn : Date
});

// the schema is useless so far
// we need to create a model using it
var Todo = mongoose.model<ITodoModel>('Todo', todoSchema);

// make this available to our users in our Node applications
export = Todo;
