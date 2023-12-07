const Post = require('../models/post');
const User = require('../models/user');

const { letterNumReducer } = require('../utils/handlers');
const { get500 } = require('./errors');

// * (GET) Main Page 
exports.homePageController = async (req,res) => {

    try {   
        const numberOfPosts = await Post.find({status : "public"}).countDocuments() 
        const posts = await Post.find({status : "public"}).sort({createdAt : "descending"})

        res.status(200).json({
            posts, total :numberOfPosts
        })
    } catch (err) {
        res.status(400).json({
            message : "There is a problem !",
            err,
        })
        console.log(err)
    }
    

}

// * (GET) Show Posts
exports.postsController = async (req,res) => {

    try {
        const post = await Post.findOne({ _id : req.params.id})
    
        if(!post) return res.status(400).json({
            message : "post not found !"
        })
    
        res.status(200).json({
            post
        })
    } catch (err) {
        res.status(400).json({
            message : "A Problem !",
            err
        })
        console.log(err)
    }
}

// * (GET) Handle Search & show Posts By that
exports.handleSearch = async (req, res) => {

    const page = +req.query.page || 1

    try {
        const page = +req.query.page || 1
        const postsPerPage = 4
    
        const numberOfPosts = await Post.find({
            status : "public",
            $text : {$search : req.body.search}
        }).countDocuments()
        
        const posts = await Post.find({
            status : "public",
            $text : {$search : req.body.search}
        }).sort({createdAt : "descending"})
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
        get500(req, res)
        console.log(err)
    }
    
 
}