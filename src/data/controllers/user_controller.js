'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

exports.register = function (req, res) {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save().then(function (user) {


        user.password = undefined;
        return res.json({ data: user, ok: true });


    }).catch(function (err) {
        return res.status(400).send({
            message: err
        });
    });
};

exports.sign_in = function (req, res) {
    User.findOne({
        email: req.body.email
    }).then(async function (user) {
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!user || !isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ ok: true, data: { token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'secret_key') } });
    }).catch(function (err) {
        throw err;
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {

        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};

exports.profile = function (req, res, next) {
    if (req.user) {
        res.send(req.user);
        next();
    }
    else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};