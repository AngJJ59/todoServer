const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connetion Successfull");
}).catch((err) => {
    console.log(err.message);
})

const TodoList = require('./model/TodoList')

app.get('/todolists', async (_req, res) => {
    const todoList = await TodoList.find()

    res.json(todoList)
})

app.post('/todolists/new', (req, res) => {
    const todo = new TodoList({
        title: req.body.title,
        description: req.body.description,
        taskStatus: req.body.status
    })

    todo.save()

    res.json(todo)
})

app.delete('/todolists/delete/:uniqueIdentifier', async (req, res) => {
    const result = await TodoList.findByIdAndDelete(req.params.uniqueIdentifier)

    res.json(result)
})

app.put('/todolists/complete/:id', async (req, res) => {
    const todo = await TodoList.findById(req.params.id)

    todo.taskStatus = !todo.taskStatus
    
    todo.save()

    res.json(todo)
})

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);