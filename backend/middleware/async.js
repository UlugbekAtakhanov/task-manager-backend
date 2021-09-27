const asyncWrapper = (fn) => {
    return  (
        async (req, res, next) => {
            try {
                await fn(req, res, next)
            } catch (error) {
                next(error)   // "next"  is passing an "error" to the next function, in our case it is errorHandlerMiddleware
            }
        }
    )
}

module.exports = asyncWrapper

