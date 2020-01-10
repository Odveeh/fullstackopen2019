let _ = require('lodash')


const dummy = (blogs) => {
    
    return 1;
  }

const totalLikes = (blogs) => {

    const likeArray = blogs.map(blog => blog.likes);
    const likesSum = likeArray.reduce((a, b) => a + b, 0);

    return likesSum;
}


const favoriteBlog = (blogs) => {

    const likeArray = blogs.map(blog => blog.likes);
    const favoriteBlogIndex = likeArray.indexOf(Math.max(...likeArray))

    return favoriteBlogIndex;
}


const mostBlogs = (blogs) => {

    //const authorList = blogs.map(blog => blog.author);
    //console.log("authorlist: ", authorList);

    const mostBlogs = _.countBy(blogs, 'author');
    console.log("mostBLogs: ", mostBlogs);

    
    const AuthorList = Object.getOwnPropertyNames(mostBlogs);
    console.log("authorlist:", AuthorList);
    const mostBlogsArr = Object.values(mostBlogs);
    console.log("mostBlogsArr0:", mostBlogsArr[0]);
    const indexOfMax = mostBlogsArr.indexOf(Math.max(...mostBlogsArr));


    const authorWithMostBlogs = {
        author: AuthorList[indexOfMax],
        blogs: mostBlogsArr[indexOfMax]
    }
    console.log("most blogs: ", authorWithMostBlogs);

    return authorWithMostBlogs;

}

const mostLikes = (blogs) => {

    let authors = []



    for(let i = 0; i < blogs.length; i++){
        //console.log("blogs looped: ", blogs[i].author);

        if(authors.map(author => author.author).includes(blogs[i].author)){
            //console.log("author", blogs[i].author, "is already in thearray !")

            let theIndex = authors.findIndex(author => author.author === blogs[i].author);
            //console.log("THE INDEX: ", theIndex);
            authors[theIndex].likes += blogs[i].likes;

        } else {
            const author = {"author": blogs[i].author, "likes": blogs[i].likes};
            authors.push(author)
            //console.log("author", blogs[i].author, "added in the array!");
        }
    }
    //console.log("likes: ", authors.map(author => author.likes));
    //console.log("index of max1", Math.max(...authors.map(author => author.likes)))
    //console.log("index of max: ", (authors.map(author => author.likes)).indexOf(Math.max(...authors.map(author => author.likes))))

    const indexWithMostLikes = (authors.map(author => author.likes)).indexOf(Math.max(...authors.map(author => author.likes)));

    

    const authorWithMostLikes = {
        "author": authors[indexWithMostLikes].author,
        "likes": authors[indexWithMostLikes].likes
    }

    console.log("author with most likes: ", authorWithMostLikes)

    return authorWithMostLikes;

    //const authorList = blogs.map(blog => blog.author);
    //console.log("authorlist: ", authorList);

    /*
    const mostBlogs = _.countBy(blogs, 'author');
    console.log("mostBLogs: ", mostBlogs);

    
    const AuthorList = Object.getOwnPropertyNames(mostBlogs);
    console.log("authorlist:", AuthorList);
    const mostBlogsArr = Object.values(mostBlogs);
    console.log("mostBlogsArr0:", mostBlogsArr[0]);
    const indexOfMax = mostBlogsArr.indexOf(Math.max(...mostBlogsArr));


    const authorWithMostBlogs = {
        author: AuthorList[indexOfMax],
        blogs: mostBlogsArr[indexOfMax]
    }
    console.log("most blogs: ", authorWithMostBlogs);

    return authorWithMostBlogs;
    */
}



  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }