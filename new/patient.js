const MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId

const myurl = 'mongodb://localhost:27017';

MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('test') 
    app.listen(3000, () => {
        console.log('listening on 3000')
  })
})

var name_of = req.body['Doctor_name'];
var surname_of = req.body['Doctor_surname'];
var doctor_id = db.collection('doctors').find({id:0});
console.log(name_of);
var finalDoctor = {
    name: name_of,
    surname: surname_of
};