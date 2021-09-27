const express = require("express")
const app = express()

// routes
const tasks = require("./routes/task")

// function to connect to DB
const connectDB = require("./db/connect")

// connectionString from .env file
require("dotenv").config()
const url = process.env.MONGO_URI

// if route does not exist
const notFound = require("./middleware/not-found")

// it is a error handler. and it must at the end..
const errorHandlerMiddleware = require("./middleware/error-handler")





// middleware
app.use(express.json())


// routes
app.use("/api/v1/tasks", tasks)

// if route does not exist
app.use(notFound)

// it is an error handler, and must be at the end..   And it has relationship with async.js
// in async.js we have "catch" block, and "next(error)"..   And this error handler is the next function
app.use(errorHandlerMiddleware)





const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(url)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()