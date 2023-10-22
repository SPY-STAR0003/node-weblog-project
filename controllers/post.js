const {get404, get500} = require('../controllers/errors');
const multer  = require('multer')
const uuid = require('uuid').v4;

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

        res.render("dashboard", {
            pageTitle: "Add Post",
            path : '/dashboard',
            page : "/add-post",
            fullName: req.user.name,
            errors: errorsArr,
        });
    }
}

exports.upload = async (req, res) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/uploads/");
        },
        filename: (req, file, cb) => {
            // console.log(file);
            cb(null, `${uuid()}_${file.originalname}`);
        },
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb("Only JPEG Format supported !", false);
        }
    };

    const upload = multer({
        limits: { fileSize: 4000000 },
        dest: "uploads/",
        storage: storage,
        fileFilter: fileFilter,
    }).single("post-image");

    upload(req, res, (err) => {
        if (err) {
            console.log("not")
            res.send("not")
        } else {
            res.status(200).send("Upload was successful !");
        }
    });
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