const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'});

const morgan = require("morgan");
const cors =  require("cors");
const express =  require("express");
const fileUpload = require('express-fileupload');
const checkPerms = require('./controllers/auth').checkPerms;
const app = express();

if (process.env.NODE_ENV == "developvent"){
    app.use(morgan('dev'));
}

// connect db
const connectDB = require('./config/db.js');
connectDB();

// middleware
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(checkPerms);

// connect router
const usersRouter = require('./routers/users');
const photoRouter = require('./routers/photo');
const consultationsRouter = require('./routers/consultations');
const operationsRouter = require('./routers/operations');
const analyzesRouter = require('./routers/analyzes');
const authRouter = require('./routers/auth');

// use router
app.use('/api/users', usersRouter);
app.use('/api/photos', photoRouter);
app.use('/api/consultations', consultationsRouter);
app.use('/api/operations', operationsRouter);
app.use('/api/analyzes', analyzesRouter);
app.use('/api/auth', authRouter);

// start server
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Starting server on port ${PORT}`));