const Post = require('../models/post');
const User = require('../models/user');

const { letterNumReducer } = require('../utils/handlers');

// * (GET) Main Page 
exports.homePageController = async (req,res) => {

    try {
        const page = +req.query.page || 1
        const postsPerPage = 4
    
        const numberOfPosts = await Post.find({status : "public"}).countDocuments() 
        const posts = await Post.find({status : "public"}).sort({createdAt : "descending"})
            .skip((page-1) * postsPerPage)
            .limit(postsPerPage)
    
        res.render("index", {
            pageTitle : "RahatBekhun",
            path : "/",
            posts,
            letterNumReducer,
            currentPage : page,
            nextPage : page + 1,
            prevPage : page - 1,
            lastPage : Math.ceil(numberOfPosts / postsPerPage)
        })
    } catch (err) {
        res.render("errors/500")
        console.log(err)
    }
    

}

// * (GET) Show Posts
exports.postsController = async (req,res) => {

    try {
        const post = await Post.findOne({ _id : req.query.id})

        const user = await User.findOne({ _id : post.user })
    
        if(!post) return res.redirect("/errors/404")
    
        res.render("./pages/post/index", {
            pageTitle : post.title,
            path : "/posts",
            post,
            user : user.name
        })
    } catch (error) {
        res.render("errors/500")
        console.log(error)
    }
}

