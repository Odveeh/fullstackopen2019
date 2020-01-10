const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const blogsRouter = require('./controllers/blogs.js')
const config = require('./utils/config.js');
const usersRouter = require('./controllers/login')


console.log("start of the app!")

const mongoURLI = config.mongoURL;
console.log("config.url:", config.mongoURL);
const mongoUrl = 'mongodb://localhost/bloglist'

mongoose.connect(mongoURLI, { useNewUrlParser: true })
    .then(result => {
        console.log("conncetd to mongodb")
    }).catch((error => {
        console.log("error connecting to mongo:", error)
    }))

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)



module.exports = app;