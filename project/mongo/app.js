/**
 * Created by Dharshini on 6/8/2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer1-2017');
mongoose.Promise = require('q').Promise;

var blogPostSchema = mongoose.Schema({
   title: String,
    body: String,
    postDate: {type: Date, default: Date.now},
    thumbsUp: {type: Number, default: 0},
}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);


function removeBlogPost(postId) {
    return blogModel
        .remove({_id: postId});
}
function updateBlogPost(postId, newPost) {
    return blogModel
        .update({_id: postId}, {
        $set: newPost
    });
}
function findBlogPostByTitle(title) {
    return blogModel.find({title: title});
}

function findBlogPostById(postId) {
    return blogModel.findOne({_id: postId});
}
function findAllBlogPosts() {
    return blogModel.find();
}

function createBlogPost(blogPost) {
    return blogModel
        .create(blogPost);
}

/*
removeBlogPost("5939c974b71e56180822f5b5", {
    body: 'Body 456 456'
})
    .then(function (status) {
        return findBlogPostById("5939c974b71e56180822f5b5")
    }, function (err) {
        console.error(err);
    }).then(function (blogPost) {
    console.log(blogPost);
}, function (err) {
    console.error(err);
});
*/

/*
updateBlogPost("5939c974b71e56180822f5b5", {
    body: 'Body 456 456'
})
    .then(function (status) {
        return findBlogPostById("5939c974b71e56180822f5b5")
    }, function (err) {
        console.error(err);
    }).then(function (blogPost) {
    console.log(blogPost);
}, function (err) {
    console.error(err);
});
*/

/*
findBlogPostByTitle('Post 456')
    .then(function (doc) {
        console.log(doc)
    }, function (err) {
        console.error(err);
    });
*/

/*findBlogPostById("5939ce7d7896b13834d74ae9")
    .then(function (blogPost) {
        console.log(blogPost);
    });*/

/*
findAllBlogPosts()
    .then(function (posts) {
        console.log(posts);
    });
*/
/*
createBlogPost({title: 'Post 789', body: 'Body 789'})
    .then(function (doc) {
        console.log(doc);
    }, function (err) {
        console.error(err);
    });
*/
