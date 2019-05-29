const Locker = require('../db/locker')

module.exports = (app) => {

    app.get('/api/locker-reg', (req, res) => {

        const locker = [
        {
            _id: 1,
            name: "",
            number: "1",
            password: ""
        },  {
            _id: 2,
            name: "",
            number: "2",
            password: ""
        },  {
            _id: 3,
            name: "",
            number: "3",
            password: ""
        },  {
            _id: 4,
            name: "",
            number: "4",
            password: ""
        }, 
        
    ]

        Locker.create(locker, (err, results) => {
            //console.log(userInfo)
            res.send(results)
            console.log(results)
            //res.render('success')
        })
    })
}