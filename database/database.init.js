const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://0.0.0.0:27017/database')

function connect() {
    client.connect()
        .then(() => console.log('Connected Successfully To Database'))
        .catch(error => console.log('Failed to connect', error))
}
function disconnect() {
    client.close();
    console.log("DataBase Disconnecteed");
}
//hi h
module.exports = { connect, disconnect };