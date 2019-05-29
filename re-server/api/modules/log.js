const logger = (req, res, next) => {
    console.log('New request from URL: ' + req.url + ' ' + new Date(Date.now()).toUTCString())
    next()
}
module.exports = logger