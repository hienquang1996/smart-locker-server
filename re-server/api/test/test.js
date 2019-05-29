const teSt = require('../db/locker')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

function getTest(res) {
    teSt.find((err, test) => {
        if (err) {
            res.send(err)
        } else {
            res.json(test)
        }
    })
}

module.exports = (app) => {

    var a=0

    app.get('/api/test', (req, res) => {
        //getTest(res)
        teSt.find({}, (err, result) => {
            if (err) throw err

            console.log("1: ", result[0].password)
            console.log("2: ", result[1].password)
            console.log("3: ", result[2].password)
            console.log("4: ", result[3].password)


            //1
            var i = 0
            if (result[0].password == null || result[0].password == 0) {
                var b = 1
            }
            //2
            if (result[1].password == 0 || result[1].password == null) {
                var c = 2
            }
            //3
            if (result[2].password == 0 || result[2].password == null) {
                var d = 3
            }
            //4
            if (result[3].password == 0 || result[3].password == null) {
                var e = 4
            }

            res.render('locker', { Number: result.length, locker1: b, locker2: c, locker3: d, locker4: e })
        })
    })



    app.post('/api/test', urlencodedParser, (req, res) => {
        var lock_info = {
            name: req.body.name,
            number: req.body.locker,
            password: req.body.code
        }

        if (!req.body.locker) {
            return res.status(500).send("Please fill all data")
        } else {
            teSt.findOne({ number: req.body.locker }, (err, result) => {
                if (result.password != 0) {
                    return res.status(500).send("Locker is used!!!! Please pick another one")
                } else {
                    teSt.updateOne({ number: req.body.locker }, {
                        name: req.body.name,
                        password: req.body.code
                    }, (err, result) => {
                        if (err) {
                            return res.status(500).json(err)
                        } else {
                            res.render('success', { Name: req.body.name, Number: req.body.locker })
                            //getTest(res)
                            a = req.body.locker
                        }

                    })
                }
            })
        }
        //res.send(lock_info)
        //console.log(lock_info)
    })

    app.get('/api/test/:id', (req, res) => {
        console.log('a: ', a)
        if (req.params.id == "android") {
            if (req.query.code == "1") {
                res.send(`${a}`)
                a=0
                console.log("a values: ",a)
            }
        }
    })
}


