const login = require('../db/user')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

function getLogin(res) {
    login.find((err, login) => {
        if (err) {
            res.send(err)
        } else {
            res.json(login)
        }
    })
}

module.exports = (app) => {
    //get all user data;
    app.get('/api/login', (req, res) => {
        //getLogin(res)
        res.render('login')
    })

    app.post('/api/login/check', urlencodedParser, (req, res) => {
        user = {
            name: req.body.name,
            pass: req.body.pass
        }

        console.log(user)
        //getLogin(res)

        login.find({ name: user.name }, (err, login) => {
            if (err) throw err
            else {
                console.log(login)
                if (login[0].password == user.pass) {
                    //res.json(login)
                    res.render('select')
                }else{
                    console.log(login[0].password)
                    res.render('error')
                }
            }
        })
    })
}