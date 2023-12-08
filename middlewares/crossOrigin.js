
exports.crossOrigin = (req, res, next) => {

    res.setHeader("access-control-allow-origin", "*")
    res.setHeader("access-control-allow-methods", "GET, POST, DELETE, PUT")
    res.setHeader("access-control-allow-headers", "Content-Type, Authorization")

    next()
}