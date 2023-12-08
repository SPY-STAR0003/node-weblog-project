
exports.errorHandler = (error, req, res, next) => {

    const message = error.message
    const status = error.statusCode || 500
    const data = error.data

    res.status(status).json({ message,data })
}