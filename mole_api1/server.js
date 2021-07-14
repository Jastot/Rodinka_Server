const dotenv = require("dotenv");
const express =  require("express");
const morgan = require("morgan");
const cors =  require("cors");
const connectDB = require('./config/db.js');

dotenv.config({path: './config/config.env'});
connectDB();

// connect router
const users = require('./routes/users');
const app = express();

app.use(express.json());

if (process.env.NODE_ENV == "developvent"){
    app.use(morgan('dev'));
}
app.use(cors());
app.use('/api/users', users);


// монтируем роутер

const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server start on port ${PORT}`));