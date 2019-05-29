const express = require('express')
//import express from 'express'
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const config = require('./config')
const log = require('./api/modules/log')
const app = express()
const port = 3000

//////////////////////// add API \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const register = require('./api/register/register') // register user
const locker = require('./api/register/regLocker') // register locker
const login = require('./api/login/user_login') // login
const rlocker = require('./api/login/Rlocker/rlocker') // regis locker
const test = require('./api/test/test') // test section
const android = require('./api/android/android')
const mobile = require('./api/mobile/mobile')


////////////////////////////////////////////////////////////////////

app.use('/assets', express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(log)
app.use(morgan('dev'))

mongoose.connect(config.getdbConnectionString())
console.log(config.getdbConnectionString())


/////////////////////// Use API \\\\\\\\\\\\\\\\\\\\\\\\\\\
register(app) // update user info
locker(app) // update locker
login(app)
rlocker(app) // regist locker
test(app)
android(app) // section for android checking code 
mobile(app)

////////////////////////////////////////////////////////////

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('main')
})

app.listen(port, () => { console.log(`SERVER is running at port ${port}!!!`) })