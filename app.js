const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const router = require("./router/students");
const app = express();
const port = 5050;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'studentDB';

let db = null;

//MongoDB connection
const connectToDB = async ()=>{
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
}

app.use(bodyParser.json());

connectToDB().then((database) => {
    app.use((req, res, next) => {
        req.db = database;
        next()
    })
    //route
    app.use("/api",router)
}).catch((err) => {
    console.log("Failed to connect mongoDB",err);
})


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})