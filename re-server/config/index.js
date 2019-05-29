const configValues=require('./config')

module.exports ={
    getdbConnectionString: ()=>{
        return `mongodb://${configValues.username}:${configValues.password}@ds157574.mlab.com:57574/quang`
    }
}