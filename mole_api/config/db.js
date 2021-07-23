const mongoose = require('mongoose');

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // user: process.env.MONGO_LOGIN,
        // pass: process.env.MONGO_PWD,
        auth:{
            authdb:"admin"
        },
        useNewUrlParser: true, 
        useUnifiedTopology: true.valueOf,
        useCreateIndex: true,
        //useFindandModify: false
    })
    console.log(`MongoDB is started and connected at ${(await conn).connection.host}`);
}
module.exports = connectDB;