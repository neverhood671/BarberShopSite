const MongoClient = require('mongodb').MongoClient,
    config = require('../config.json'),
    dbConfig = config.mongodb,
    fraudsParams = config.fraudsParams;

const url = dbConfig.db + '://' + dbConfig.host + ':' + dbConfig.port,
    dbName = dbConfig.name,
    usersCollectionName = 'users',
    visitsCollectionName = 'visits';

let db, collections = {};


module.exports.connect = function(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        if (err)
            throw err;

        db = client.db(dbName);
        collections[usersCollectionName] = db.collection(usersCollectionName);
        collections[visitsCollectionName] = db.collection(visitsCollectionName);

        if (callback)
            callback();
    });
}


module.exports.insert = function(collectionName, data, callback) {

    collections[collectionName].insertMany(data, function(err, result) {
        if (callback)
            callback(err, result);
    });

}