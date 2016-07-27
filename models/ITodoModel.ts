/// <reference path="../_references.d.ts" />
'use strict';

// grab the things we need
import mongoose = require('mongoose');
import ITodo = require('../models/todo');

interface ITodoModel extends ITodo, mongoose.Document { }

export = ITodoModel;