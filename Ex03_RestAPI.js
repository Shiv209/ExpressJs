const app = require("express")();
const mongo = require("mongodb").MongoClient;
const parser = require("body-parser");

app.use(parser.urlencoded({"extended" : true}));//We want to parse as JSON data.
app.use(parser.json());

let db;
function getConnection(){
    const url = "mongodb://127.0.0.1:27017/";
    mongo.connect(url).then(mongo=>{
        db = mongo.db("SampleDatabase");
    }).catch(err=>{
        console.log(err.message);
    })
}
getConnection();//Call this function once and only once 

//HTTPGET
app.get("/Employees", (req, res)=>{
    db.collection("employees").find().toArray().then(data=>{
        res.send(data);//data is sent as response to the Caller of this API
    })
})
//nodemon
app.get("/Client", (req, res)=>{
    res.sendFile(__dirname + "/RestClient.html")   
})

app.post("/Employees", (req, res)=>{
    let rec = req.body;
    console.log(res);
    db.collection("employees").insert(rec);
    res.send("Employee inserted to the database")
})

app.listen(1234, ()=>{
    console.log("server is available at 1234")
})
