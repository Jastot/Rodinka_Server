const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'});

const morgan = require("morgan");
const cors =  require("cors");
const express =  require("express");
const fileUpload = require('express-fileupload');
const app = express();



// connect db
const connectDB = require('./config/db.js');
connectDB();

// connect router
const usersRouter = require('./routers/users');
const photoRouter = require('./routers/photo');
const consultationsRouter = require('./routers/consultations');

// use router
app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV == "developvent"){
    app.use(morgan('dev'));
}
app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/photos', photoRouter);
app.use('/api/consultations', consultationsRouter);
// start server
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Starting server on port ${PORT}`));