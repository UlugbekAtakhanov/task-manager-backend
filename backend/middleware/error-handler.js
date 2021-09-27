const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({msg: err})
    // return res.status(500).json({msg: "Something went wrong.."})        // it is a custom message
}

module.exports = errorHandlerMiddleware