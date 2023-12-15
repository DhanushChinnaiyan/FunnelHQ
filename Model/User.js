const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const Secret_KEY = process.env.Secret_KEY


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    googleId:String

})


userSchema.pre('save',async function(next){
    const document = this
   
    if(!document.isModified('password')){
        return next()
    }

    try {
        const hashedPassword = await bcrypt.hash(document.password,10)
        document.password = hashedPassword;
        return next()
        
    } catch (error) {
        return next(error)
    }
})

const User = mongoose.model("user",userSchema)

const generateToken = (user) => {
    try {
        return jwt.sign({ user }, Secret_KEY, { expiresIn: "2d" });
    } catch (err) {
        throw new Error('Token generation failed');
    }
}

module.exports = { User,generateToken}