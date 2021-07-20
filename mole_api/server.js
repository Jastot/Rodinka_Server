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
app.use((req,res,next)=>{
    if (/.+\/$/.test(req.path)){
        req.url=req.url.slice(0, -1);
    }
    next();
})
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(checkPerms);

// api router
const api = require('./routers/!api-master');
app.use('/api/', api);

// start server
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Starting server on port ${PORT}`));