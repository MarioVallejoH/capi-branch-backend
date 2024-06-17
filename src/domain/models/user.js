// models/User.js
const mongoose = require('mongoose');
var TODO = require('./todo')
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },

});
module.exports = mongoose.model('User', userSchema);