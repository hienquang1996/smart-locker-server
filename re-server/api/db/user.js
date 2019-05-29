const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const register = mongoose.model("User_Info", userSchema)
module.exports = register