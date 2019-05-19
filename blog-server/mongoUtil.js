const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://localhost:27017';
let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, { useNewUrlParser: true },(err, client) => {
        mongodb = client.db('BlogServer');
        callback();
    });
}
function db(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    db,
    close
};
