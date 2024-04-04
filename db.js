const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId

let database ; 

async function getdabase(){
    const client = await MongoClient.connect('mongodb+srv://balaemma17:9842783627@cluster0.foxel2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

    database = client.db('cars')
    if(!database){
        console.log('database not connected');
    }
    return database;
}

module.exports={
    getdabase,
    ObjectID
}