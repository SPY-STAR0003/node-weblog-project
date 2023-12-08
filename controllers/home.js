const Post = require('../models/post');

// * (GET) Main Page 
exports.homePageController = async (req, res, next) => {

    try {   
        const numberOfPosts = await Post.find({status : "public"}).countDocuments() 
        const posts = await Post.find({status : "public"}).sort({createdAt : "descending"})

        if(!posts) {
            const error = new Error("There is no post in database !")
            error.statusCode = 404;
            throw error;
        } 

        res.status(200).json({
            posts, total :numberOfPosts
        })
    } catch (err) {
        next(err)
    }
    

}

// * (GET) Show Posts
exports.postsController = async (req, res, next) => {

    try {
        const post = await Post.findOne({ _id : req.params.id})
    
        if(!post) {
            const err = new Error("No user with this information !")
            err.statusCode = 404
            throw err;
        }
    
        res.status(200).json({post})
    } catch (err) {
        next(err);
    }
}

// * (GET) Handle Search & show Posts By that
// ! Search Deleted Make That in React because of SEO!