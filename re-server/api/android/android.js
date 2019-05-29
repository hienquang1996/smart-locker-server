const android = require('../db/locker')
const rfid = require('../db/user')

module.exports = (app) => {

    var a = 0
    var b = 0
    var c = 0
    var e, d

    ///////////////////// QR code \\\\\\\\\\\\\\\\\\\\\\\\
    app.get('/api/android/:id', (req, res, next) => {
        if (req.params.id == "android") {
            android.find({}, (err, data) => {
                if (err) {
                    return res.status(500).send('Something wrong!!!!')
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].password == req.query.code) {
                        a = 1
                    }
                }
                console.log('value a: ', a)
                if (a == 1) {
                    console.log("OK")
                    android.findOne({ password: req.query.code }, (err, result) => {
                        a = 0
                        console.log('locker number: ', result.number)
                        android.updateOne({ number: result.number }, {
                            name: "",
                            password: "0"
                        }, (err, data) => {
                            if (err) {
                                return res.status(500).json(err)
                            } else {
                                res.send(`${result.number}`)
                                console.log('value a: ', a)
                            }
                        })
                        //res.send(`${result.number}`)
                        //console.log('value a: ', a)
                    })
                } else {
                    console.log("Something wrongggg")
                    res.send(`${a}`)
                }
            })
        }


        /////////////////////////// open = rfid \\\\\\\\\\\\\\\\\\\\\\\\\\
        else if (req.params.id == "rfid") {
            //////////////// TEST IF THIS IS USER OR NOT \\\\\\\\\\\\\\\\\
            rfid.find({}, (err, data) => {
                if (err) {
                    console.log("THIS CARD IS NOT REGISTERED!!!!")
                    return res.status(500).send("0")
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == req.query.name && data[i].password == req.query.pass) {
                        a = 1
                    }
                }
                console.log('value a: ', a)
                if (a == 1) {
                    a = 0
                    //////////////////// TEST IF THIS USER REGISTED LOCKER OR NOT \\\\\\\\\\\\\\\\\\\\\
                    android.find({}, (err2, data2) => {
                        if (err2) {
                            console.log("ERRORR!!!!")
                            return res.status(500).send("0")
                        }
                        for (var i = 0; i < data2.length; i++) {
                            if (data2[i].name == req.query.name && data2[i].password == req.query.pass) {
                                b = 1
                                c = data2[i].number

                                //next()
                            } else {
                                //res.send(`${a}`)
                            }
                        }
                        console.log('value b: ', b)
                        console.log('value c: ', c)

                        /////////////////// THIS USER REGISTERED THE LOCKER \\\\\\\\\\\\\\\\\\
                        if (b == 1) {
                            b = 0

                            android.find({}, (err, data) => {
                                if (err) {
                                    console.log("ERRORRRRRR!!!!")
                                    return res.status(500).send("0")
                                }

                                console.log("data: ", data)

                                console.log("data1: ", data[0].password)


                                console.log("username: ", req.query.name)
                                console.log("password: ", req.query.password)


                                var i = 0
                                if (data[0].name == req.query.name || data[1].password == req.query.password) {
                                    var x = 1
                                } else {
                                    x = ""
                                }
                                //2
                                if (data[1].name == req.query.name || data[1].password == req.query.password) {
                                    var y = 2
                                } else {
                                    y = ""
                                }
                                //3
                                if (data[2].name == req.query.name || data[2].password == req.query.password) {
                                    var z = 3
                                } else {
                                    z = ""
                                }
                                //4
                                if (data[3].name == req.query.name || data[3].password == req.query.password) {
                                    var t = 4
                                } else {
                                    t = ""
                                }

                                console.log("registerd locker: ", x, y, z, t)

                                res.send(`${x} ${y} ${z} ${t} registered-locker`)
                                //console.log("aaasdasdsad: ", data.number)
                                //res.send(`${data[0].number} ${data[1].number}`)
                            })

                            /* 
                             android.updateOne({ number: c }, {
                                 name: "",
                                 password: "0"
                             }, (err, data) => {
                                 if (err) {
                                     return res.status(500).json(err)
                                 } else {
                                     res.send(`${c}`)
                                     c = 0
                                     console.log('value a, b, c: ', a, b, c)
                                 }
                             })*/
                        } else if (b == 0) {
                            android.find({}, (err, result) => {
                                if (err) {
                                    console.log("ERRORRRRRR!!!!")
                                    return res.status(500).send("0")
                                }
                                console.log("1: ", result[0].password)
                                console.log("2: ", result[1].password)
                                console.log("3: ", result[2].password)
                                console.log("4: ", result[3].password)

                                //1
                                var i = 0
                                if (result[0].password == null || result[0].password == 0) {
                                    var x = 1
                                } else {
                                    x = ""
                                }
                                //2
                                if (result[1].password == 0 || result[1].password == null) {
                                    var y = 2
                                } else {
                                    y = ""
                                }
                                //3
                                if (result[2].password == 0 || result[2].password == null) {
                                    var z = 3
                                } else {
                                    z = ""
                                }
                                //4
                                if (result[3].password == 0 || result[3].password == null) {
                                    var t = 4
                                } else {
                                    t = ""
                                }

                                res.send(`${x} ${y} ${z} ${t} non-registerd-locker`)
                            })
                        }
                    })
                } else {
                    res.send(`${a}`)
                }
            })
        }
    })

    /*if(b == 1){
        app.get('/api/android/')
    }*/

    /////////////////////// open and register locker \\\\\\\\\\\\\\\\\\\\\\

    app.get('/api/android/rfid/:id', (req, res) => {

        if (req.params.id == "register") {
            android.updateOne({ number: req.query.locker }, {
                name: req.query.name,
                password: req.query.pass
            }, (err, data) => {
                if (err) {
                    return res.status(500).json(err)
                } else {
                    console.log('Updated')
                    console.log('value a, b, c: ', a, b, c)
                    res.send(`${req.query.locker}`)
                }
            })
        } else if (req.params.id == "open") {
            android.updateOne({ number: req.query.locker }, {
                name: "",
                password: "0"
            }, (err, data) => {
                if (err) {
                    return res.status(500).json(err)
                } else {
                    res.send(`${req.query.locker}`)
                    var d = req.query.locker
                    console.log('value a, b, d: ', a, b, d)
                }
            })
        }
    })
}


