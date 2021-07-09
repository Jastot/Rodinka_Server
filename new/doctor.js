const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const multer = require('multer');
fs = require('fs-extra')
app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId

const myurl = 'mongodb://localhost:27017';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
  }
})

function getValueForNextSequence(sequenceOfName){

    var sequenceDoc = db.sample.findAndModify({
    query:{_id: sequenceOfName },
    update: {$inc:{sequence_value:1}},
    new:true
});

    return sequenceDoc.sequence_value;
}


var upload = multer({ storage: storage })

MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('test') 
    app.listen(3000, () => {
        console.log('listening on 3000')
  })
})

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index1.html');
});

//db.doctors.insert( {_id: "item_id" , sequence_value : 0 })

app.post('/uploadname', function (req, res, next) {
    var name_of = req.body['Doctor_name'];
    var surname_of = req.body['Doctor_surname'];
    var id_of = getValueForNextSequence("item_id");
    console.log(name_of);
    var finalDoctor = {
        name: name_of,
        surname: surname_of,
        id: id_of
    };
    db.collection('doctors').insertOne(finalDoctor, (err, result) => {
        console.log(result)
  
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })
