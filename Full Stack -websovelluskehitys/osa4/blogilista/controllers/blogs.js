const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js')









//testing:
/*
app.get('/', (request, response) => {
    console.log("/ GET req");
    response.json({info: "frontpage"})
  })
*/

blogsRouter.delete('/:id', (request, response) => {
    console.log("blogs router delete route");
    Blog.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log("note deleted!")
      response.status(204).end()
    })
    .catch(error => next(error))




})



blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    //console.log("request: ", request);
    console.log("request body: ", request.body)
    console.log("new blog: ", blog);

    
    console.log("post request property title: ", request.body.title);
    console.log("post request property url: ", request.body.url);
    if(request.body.title === undefined || request.body.url === undefined){
        console.log("bad request!");
        response.status(400).json(result);
    } else {
        blog
        .save()
        .then(result => {
            console.log("new blog saved to db!")
            console.log("result: ", result);
        response.status(201).json(result)
        })
        .catch(error => console.log("errori blogin lisäämsiessä db:hen: ", error))


    }
   
})


module.exports = blogsRouter;