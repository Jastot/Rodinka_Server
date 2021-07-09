const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const multer = require('multer');
fs = require('fs-extra')
app.use(bodyParser.urlencoded({extended: true}))

db.doctors.pre('save', async function (next) {
    this.mySuperIdx =   ClientSchema.countDocument({})
   });

const MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId

const myurl = 'mongodb://localhost:27017';

MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('test') 
    app.listen(3000, () => {
        console.log('listening on 3000')
  })
  //var a = await db.collection('doctors').find().count();
  //console.log(a);
})
//console.log(a);
