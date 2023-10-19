const {get404, get500} = require('../controllers/errors');

const Post = require('../models/post'); 

exports.addPost = async (req,res) => {

    const errorsArr = []

    try {
        await Post.postValidation(req.body)
        await Post.create({
            ...req.body,
            user : req.user._id
        })
        res.redirect("/admin/posts")
    } catch (err) {
        err.errors.forEach(err => errorsArr.push(err));
        console.log(errorsArr)
        res.render("dashboard", {
            pageTitle: "Add Post",
            path : '/dashboard',
            page : "/add-post",
            fullName: req.user.name,
            errors: errorsArr,
        });
    }
}

exports.showAddPostForm = (req,res) => {

    // console.log("errors = " + req.flash('add_post_errors'))

    res.render("dashboard", {
        pageTitle : `Add Post`,
        path : '/dashboard',
        page : "/add-post",
        errors : req.flash('add_post_errors'),
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
        // console.log(error)
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