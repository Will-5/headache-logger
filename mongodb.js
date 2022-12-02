const mongodb = require('mongodb')
const MongoClient = mongodb.mongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'headache-logger'

MongoClient.connect(connectionUrl, { 
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('unable to connect do MONGO database')
    }
})