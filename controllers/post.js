const {get404, get500} = require('../controllers/errors');

const Post = require('../models/post'); 

exports.addPost = (req,res) => {

    Post.postValidation(req.body)
    .then(() => {
        Post.create({
            ...req.body,
            user : req.user._id
        }).then(() => {
            // req.flash("add-post-msg", "Your post added to posts successfully !")
            console.log({
                ...req.body,
                user : req.user._id
            })
            res.redirect("/admin/posts")
        }).catch((err) => {
            console.log(err)
            // req.flash("add_post_alert","error 1")
            res.redirect("/admin/add-post")
        })
    })
    .catch((err) => {
        console.log(err)
        // req.flash("add_post_alert", "error 2")
        res.redirect("/admin/add-post")
    })
    
}

exports.showAddPostForm = (req,res) => {

    console.log("errors = " + req.flash('add_post_alert'))

    res.render("dashboard", {
        pageTitle : `Add Post`,
        path : '/dashboard',
        page : "/add-post",
        addPostAlert : req.flash('add_post_alert'),
        fullName : req.user.name,
    })
}

exports.getPosts = async (req,res) => {
    try {
        const posts = await Post.find({user : req.user._id})

        res.render("dashboard", {
            pageTitle : `${req.user.name} posts`,
            path : '/dashboard',
            page : "/posts",
            fullName : req.user.name,
            posts
        })
    } catch (error) {
        console.log(error)
        get500(req,res)
    }

}

exports.dashboard = (req,res) => {
    res.render("dashboard", {
        pageTitle : "Dashboard",
        path : '/dashboard',
        page : "/dashboard",
        fullName : req.user.name,
    })
}