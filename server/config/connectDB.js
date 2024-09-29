const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ChatApplication");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Something is wrong ",error)
    }
}

module.exports = connectDB