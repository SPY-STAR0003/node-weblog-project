const fs = require('fs');

const {get500} = require('../controllers/errors');
const multer  = require('multer')
const {fileFilter} = require('../utils/multer');
const uuid = require('uuid').v4;
const sharp = require('sharp');
const root = require('app-root-path');
const shortId = require('shortid');
const appRoot = require('app-root-path');

const Post = require('../models/post'); 

// * (POST) a post method to send & make a post
exports.addPost = async (req,res) => {

    const errorsArr = []
    const thumbnail = req.files ? req.files.thumbnail : {}
    const thumbName = `${shortId.generate()}_${thumbnail.name}`
    const thumbPath = `${root}/public/uploads/thumbnails/${thumbName}`

    try {
        req.body = {...req.body, thumbnail}

        await Post.postValidation(req.body)

        await sharp(thumbnail.data)
            .jpeg({quality : 60})
            .toFile(thumbPath)
            .catch((err) => {
                console.log(err)
        })

        await Post.create({
            ...req.body,
            user : req.user._id,
            thumbnail : thumbName
        })

        res.redirect("/admin/posts")
    } catch (err) {
        // err.errors.forEach(err => errorsArr.push(err));

        console.log(err)

        res.render("dashboard", {
            pageTitle: "Add Post",
            path : '/dashboard',
            page : "/add-post",
            fullName: req.user.name,
            errors: errorsArr,
        });
    }
}

// * (GET) show edit-post page with post info
exports.editPost = async (req, res) => {

    const post = await Post.findOne({
        _id : req.params.id
    })

    if(!post) {
        return res.redirect("errors/404")
    }

    if(post.user.toString() !== req.user._id) {
        return res.redirect("/admin/dashboard")
    }

    res.render("dashboard", {
        pageTitle: "Edit Post",
        path : '/dashboard',
        page : "/edit-post",
        fullName: req.user.name,
        post
    });

}

// * (GET) show add post form
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

// * (GET) get posts from db
exports.getPosts = async (req,res) => {

    const page = +req.query.page || 1
    const postsPerPage = 5

    try {
        const numberOfPosts = await Post.find({user : req.user._id}).countDocuments() 
        const posts = await Post.find({user : req.user._id})
            .skip((page-1) * postsPerPage)
            .limit(postsPerPage)

        res.render("dashboard", {
            pageTitle : `${req.user.name} posts`,
            path : '/dashboard',
            page : "/posts",
            fullName : req.user.name,
            posts,
            currentPage : page,
            nextPage : page + 1,
            prevPage : page - 1,
            lastPage : Math.ceil(numberOfPosts / postsPerPage)
        })
    } catch (error) {
        // console.log(error)
        get500(req,res)
    }

}

// * (GET) show dashboard page
exports.dashboard = (req,res) => {
    res.render("dashboard", {
        pageTitle : "Dashboard",
        path : '/dashboard',
        page : "/dashboard",
        fullName : req.user.name,
    })
}

// * (POST) send a img & make a link
exports.upload = async (req, res) => {

    const upload = multer({
        limits: { fileSize: 4000000 },
        // dest: "uploads/",
        // storage,
        fileFilter,
    }).single("post-image");

    upload(req, res, async (err) => {
        if (err) {
            if(err === "FORMAT_ERR") {
                res.status(400).send("Only JPG Format supported !")
            }
            console.log(err)
            res.status(400).send("There is an error in uploading ...")
        } else {
            if(req.file) {
                const fileName = `${uuid()}_${req.file.originalname}`

                await sharp(req.file.buffer)
                    .jpeg({quality : 50})
                    .toFile(`./public/uploads/${fileName}`)

                res.status(200).send(`http://localhost:3000/uploads/${fileName}`)
            } else {
                res.status(400).send("upload a picture !")
            }
        }
    });
}

// * (POST) send new info of post to edit that
exports.sendEditedPost = async (req, res) => {
    const errorsArr = []
    
    const post = await Post.findById(req.params.id)

    const thumbnail = req.files ? req.files.thumbnail : {}
    const thumbName = `${shortId.generate()}_${thumbnail.name}`
    const thumbPath = `${root}/public/uploads/thumbnails/${thumbName}`

    try {

        thumbnail.name 
        ? await Post.postValidation({...req.body, thumbnail})
        : await Post.postValidation({...req.body, thumbnail : {
            name : "fake thumbnail",
            size : 0,
            mimeType : "image/jpeg"
        }})

        !post && res.redirect("/errors/404")

        post.user.toString() !== req.user._id && res.redirect("/admin/dashboard")

        const { body, title, status } = req.body


        if(thumbnail.name) {
            fs.unlink(`${appRoot}/public/uploads/thumbnails/${post.thumbnail}`, async (err) => {
                if(err) console.log(err)
                else {
                    await sharp(thumbnail.data)
                    .jpeg({quality : 60})
                    .toFile(thumbPath)
                    .catch((err) => {
                        console.log(err)
                    })

                    
                    await Post.findByIdAndUpdate(req.params.id, {
                        body ,title ,status, thumbnail : thumbName
                    })
                }

            });
        } else {
            await Post.findByIdAndUpdate(req.params.id, {
                body ,title ,status, thumbnail : post.thumbnail
            })
        }

        res.redirect("/admin/posts")

    } catch (err) {
        console.log(err)
        res.redirect("errors/500")
    }
}

// * (POST) delete a post
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect("/admin/posts")
    } catch (err) {
        res.redirect("/errors/500")
        console.log(err)
    }
}