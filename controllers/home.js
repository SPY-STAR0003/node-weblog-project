const Post = require('../models/post');

const { letterNumReducer } = require('../utils/handlers');

// * (GET) Main Page 
exports.homePageController = async (req,res) => {

    const posts = await Post.find({status : "public"}).sort({createdAt : "descending"})

    res.render("index", {
        pageTitle : "RahatBekhun",
        path : "/",
        posts,
        letterNumReducer
    })
}

