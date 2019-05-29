const user = require('../db/user')
const locker = require('../db/locker')


module.exports = (app) => {

    app.get('/api/mobile/user', (req, res) => {
        user.find({}, (err, data) => {
            if(err){
                return res.status(500).send("somthinhg wrong")
            }
            res.send(data)
        })
    })


    app.get('/api/mobile/locker', (req, res) => {
        locker.find({}, (err, data) => {
            if(err){
                return res.status(500).send("somthinhg wrong")
            }
            res.send(data)
        })
    })
}