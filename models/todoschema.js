const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('TodoTask', todoTaskSchema);