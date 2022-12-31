var mongo = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var database;
mongo.connect(url).then(db => {
    database = db.db("northwind");
    database.collection("customers").find().toArray().then(result => {
        result.forEach((e) => {
            console.log(e);
        })
    });
}).catch((err) => console.log(err.message));



