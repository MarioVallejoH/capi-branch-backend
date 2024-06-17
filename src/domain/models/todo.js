// models/User.js
const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: false },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    priority: { type: String, default: 'Low' },
    completed: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('TODO', todoSchema);