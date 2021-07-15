const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'});

const morgan = require("morgan");
const cors =  require("cors");
const express =  require("express");
const app = express();



// connect db
const connectDB = require('./config/db.js');
connectDB();

// connect router
const usersRouter = require('./routes/users');

// use router
app.use(express.json());

if (process.env.NODE_ENV == "developvent"){
    app.use(morgan('dev'));
}
app.use(cors());
app.use('/api/users', usersRouter);

// start server
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Starting server on port ${PORT}`));