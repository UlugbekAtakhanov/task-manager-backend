const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],              // custom message to client side
        trim: true,                                                         // sends object without extra spaces
        maxlength: [20, "Name can not be more than 20 characters.."]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Task", TaskSchema)

//  model will be used in controllers