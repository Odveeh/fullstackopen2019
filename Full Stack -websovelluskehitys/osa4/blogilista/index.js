const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const Blog = require('./models/blog.js')


console.log("start of the app!")

const password = 'KissaPASSU81'
const dbNAME = 'blogsDB'
const mongoURLI = `mongodb+srv://odveeh99:${password}@cluster0-aqgau.mongodb.net/${dbNAME}?retryWrites=true&w=majority`

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoURLI, { useNewUrlParser: true })
    .then(result => {
        console.log("conncetd to mongodb")
    }).catch((error => {
        console.log("error connecting to mongo")
    }))

app.use(cors())
app.use(bodyParser.json())

//testing:
app.get('/', (request, response) => {
        console.log("/ GET req");
        response.json({info: "frontpage"})
      })
 

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  //console.log("request: ", request);
  console.log("request body: ", request.body)
  console.log("new blog: ", blog);

  console.log("blogs POST req!");
  blog
    .save()
    .then(result => {
        console.log("new blog saved to db!")
      response.status(201).json(result)
    })
    .catch(error => console.log("errori blogin lisäämsiessä db:hen: ", error))
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})