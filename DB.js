const mongoose = require("mongoose")
const dotenv =  require("dotenv");

// Dotenv configuration
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL

const dbConnection = async() => {
    try {
        mongoose.connect(MONGODB_URL)
        console.log("Successfully DB connected")
        
    } catch (error) {
        console.log("Mongoose error :",error)
    }
}

module.exports  = dbConnection