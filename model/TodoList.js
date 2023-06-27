const mongoose = require('mongoose')
const schema = mongoose.Schema

const todoSchema = new schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    taskStatus: {
        type: Boolean,
        default: false
    }
})

const TodoList = mongoose.model('TodoList', todoSchema)

module.exports =TodoList