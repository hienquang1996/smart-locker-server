const rlocker = require('../../db/locker')
const bodyParser = require('body-parser')

function Rlocker(res) {
    rlocker.find((err, rlocker) => {
        if (err) {
            res.send(err)
        } else {
            res.json(rlocker)
        }
    })
}

module.exports = (app) => {
    app.get('/api/login/rlocker', (req, res) => {
        //Rlocker(res)
        res.render('locker')
    })
}
