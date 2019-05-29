const mongoose = require('mongoose')
const Schema = mongoose.Schema
const lockerSchema = new Schema({
    _id: Number,
    name: String,
    number: Number,
    password: String
})

const locker = mongoose.model("locker_info", lockerSchema)
module.exports = locker