'use strict';

var mongoose = require('mongoose'),
    Todo = mongoose.model('TODO');
var ObjectId = require('mongodb').ObjectId;

exports.getAll = function (req, res, next) {
    if (req.user) {
        Todo.find({
            owner: req.user._id,
            priority: req.query.priority,
            completed: req.query.completed,
        }).then(function (task) {
            res.send({ ok: true, data: task })
        }).catch(function (err) {
            console.log(err)
        })
    }
    else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.create = function (req, res, next) {
    var newTask = new Todo(req.body);
    newTask.completed = false;
    newTask.owner = req.user._id;
    console.log(newTask)
    newTask.save().then(function (task) {
        res.json({ data: task, ok: true });
    }).catch(function (err) {
        res.status(400).send({
            message: err
        });
    });
};
exports.delete = function (req, res, next) {
    Todo.deleteOne(
        {
            _id: ObjectId(req.body.id)
        }
    ).then(function (task) {
        res.json({ data: task, ok: true });
    }).catch(function (err) {
        res.status(400).send({
            message: err
        });
    });
    next();
};
exports.update = function (req, res, next) {
    Todo.updateOne(
        {
            _id: ObjectId(req.body.id),
        },
        {
            completed: req.body.completed
        }
    ).then(function (task) {
        res.json({ data: task, ok: true });
    }).catch(function (err) {
        res.status(400).send({
            message: err
        });
    });
    next();
};