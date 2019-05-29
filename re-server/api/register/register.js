const User = require('../db/user')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {
    app.get('/api/register', (req, res) => {
        res.render('register')
    })

    app.post('/api/register/check', urlencodedParser, (req, res) => {

        if (req.body.pass == req.body.rpass) {
            const userInfo = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.pass
            }

            User.create(userInfo, (err, results) => {
                //console.log(userInfo)
                //res.send(results)
                //console.log(results)
                res.render('success')
            })
        } else {
            console.log("PASS and RPASS are not matched")
            res.render('error')
        }
    })
}