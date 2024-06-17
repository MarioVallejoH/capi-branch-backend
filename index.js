'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,


    _ = require('./src/domain/models/user'),
    _ = require('./src/domain/models/todo'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken");

const cors = require('cors');

app.use(cors())

const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://mariozxdflo:Rc4E8yp097u4lIqW@cluster0.i4u3xnd.mongodb.net/', option).then(function () {
    //connected successfully
}, function (err) {
    console.log(err)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'secret_key', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

var routes = require('./src/config/routes/routes');
routes(app);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;