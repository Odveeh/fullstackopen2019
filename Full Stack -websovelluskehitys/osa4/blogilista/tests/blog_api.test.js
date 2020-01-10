const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

/*

const Blog = require('../models/blog.js')

beforeEach(async () => {
    await Blog.deleteMany({})

        
})

*/


test('kaikkien blogien hakeminen..', async() => {

    console.log("api get blogs test")
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blogs.body.length).toBe(0)
        
    //console.log(blogs.body.length);
    //console.log(blogs.body)
})

test('adding a new blog', async() => {

    console.log("api post new blog test")

    const newBlog = {
        "title": "titlePOST1",
        "author": "authorPOST1",
        "url": "urlPOST1",
        "likes": 1
    }

    console.log("likes: ", newBlog.likes);

    let blogs = await api.get('/api/blogs')

    const blogsInitialLength = blogs.body.length
    console.log("alku pituus", blogsInitialLength);

    await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)


    const newblogs = await api.get('/api/blogs')
    const newBlogsLength = newblogs.body.length;
    console.log("uusi pituus", newBlogsLength);


    expect(newBlogsLength).toBe(blogsInitialLength + 1);

    //expect(blogs.body[0].id).toBeDefined();   
    //console.log(blogs.body.length);
    //console.log(blogs.body[0].id);
})

test('adding a new without likes field === likes=0', async() => {

    console.log("api post new blog test without likes")

    const newBlog = {
        "title": "titlePOST1",
        "author": "authorPOST1",
        "url": "urlPOST1"
    }

    const resultBlog = await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
                

    expect(resultBlog.body.likes).toBe(0);

})

test('adding new blog without title ja url === 400 bad request', async() => {

    console.log("api post new blog test without likes")

    const newBlog = {
        "author": "authorPOST1",
        "likes": 1
    }

    const resultBlog = await api.post('/api/blogs')
                .send(newBlog)
                .expect(400)
                //.expect('Content-Type', /application\/json/)
                

    expect(resultBlog.status).toBe(400);

})

test('blogeissa on kenttä id', async() => {

    console.log("api get blogs test")
    const blogs = await api.get('/api/blogs')

    
    expect(blogs.body[0].id).toBeDefined();   
    //console.log(blogs.body.length);
    //console.log(blogs.body[0].id);
})


test('blogeissa on kenttä id', async() => {

    console.log("api get blogs test")
    const blogs = await api.get('/api/blogs')

    
    expect(blogs.body[0].id).toBeDefined();   
    //console.log(blogs.body.length);
    //console.log(blogs.body[0].id);
})

test('note can be deleted', async() => {

    console.log("api get blogs test")
    const blogs = await api.get('/api/blogs')

    const blogToBeDeletedId = blogs.body[0].id;
    console.log("blogit: ", blogToBeDeletedId);

    

    await api.delete(`api/blogs/${blogToBeDeletedId}`)
        .expect(204);


    
    //expect(blogs.body[0].id).toBeDefined();   
    //console.log(blogs.body.length);
    //console.log(blogs.body[0].id);
})






afterAll(() => {
    mongoose.connection.close();
})