const Task = require("../models/Task")

// this function to REFACTORING our code
const asyncWrapper = require("../middleware/async")


// const getAllTasks = async (req, res) => {
//     try {
//         // Task === "tasks" from database, "find({})"  it finds all objects from database("tasks") and returns an array
//         const tasks = await Task.find({})
//         res.status(200).json({tasks})
//     } catch (error) {
//         res.status(500).json({msg: error})
//     }
// }

const getAllTasks = asyncWrapper( async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})

// const createTask = async (req, res) => {
//     try {
//         //  it automatically creates "tasks" DBcollection, mongoose converts "Task" to "tasks" automatically
//         // and it returns a created task
//         const task = await Task.create(req.body)
//         res.status(201).json(task)
//     } catch (error) {
//         res.status(500).json({msg: error})
//     }
// }

const createTask = asyncWrapper( async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json(task)
})

// const getTask = async (req, res) => {
//     try {
//         // there is "id" in req.params, and we rename it to "taskID" (we did destructuring)
//         const {id: taskID} = req.params
        
//         // it returns a task with such id from DB..
//         const task = await Task.findOne({_id: taskID})

//         // allways return "if" below, in case there is no such "id" in DB, otherwise can occur a bug (read documentation)
//         // and if we correc syntax of id it will return 404, otherwise it will return "catch error 500"
//         if (!task) {
//             return res.status(404).json({msg: `No task with id: ${taskID}`})
//         }
        
//         res.status(200).json({task})

//     } catch (error) {
//         // catch error 500
//         res.status(500).json({msg: error})
//     }
// }

const getTask = asyncWrapper( async (req, res) => {
        const {id: taskID} = req.params
        const task = await Task.findOne({_id: taskID})
        if (!task) {
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({task})
})

// const updateTask = async (req, res) => {
//     try {
//         const {id: taskID} = req.params
//         const data = req.body

//         // here "_id" to find the task we looking for to update, and "data"  is new info to push into DB from client side
//         const task = await Task.findOneAndUpdate({_id: taskID}, data, {
//             // this object for options (read documentation)
//             new: true,                  // it will always return new data that we send
//             runValidators: true     //  it will rerun Schema             (both are imortant)
//         })            

//          if (!task) {
//             return res.status(404).json({msg: `No task with id: ${taskID}`})
//         }

//         res.status(200).json({task})

//     } catch (error) {
//         res.status(500).json({msg: error})
//     }
// }

const updateTask = asyncWrapper( async (req, res) => {
        const {id: taskID} = req.params
        const data = req.body
        const task = await Task.findOneAndUpdate({_id: taskID}, data, {
            new: true,        
            runValidators: true     
        })   
         if (!task) {
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({task})
})

// const deleteTask = async (req, res) => {
//     try {
//         const {id: taskID} = req.params
//         const task = await Task.findOneAndDelete({_id: taskID})
//         if (!task) {
//             return res.status(404).json({msg: `No task with id: ${taskID}`})
//         }
//         res.status(200).json({task})
//     } catch (error) {
//         res.status(500).json({msg: error})
//     }
// }

const deleteTask = asyncWrapper( async (req, res) => {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({_id: taskID})
        if (!task) {
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({task})
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}