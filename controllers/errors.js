exports.get404 = (req,res) => {
    res.render("errors/404", {
        pageTitle : "404 | Not Found Page"
    })
}

exports.get500 = (req,res) => {
    res.render("errors/500", {
        pageTitle : "500 | server Error"
    })
}