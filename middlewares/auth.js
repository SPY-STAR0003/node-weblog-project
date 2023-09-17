
exports.auth = (req, res, next) => {

    const isAuth = req.isAuthenticated()

    isAuth ? next() : res.redirect("/404")
}