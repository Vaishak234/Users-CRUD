const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path');
const session = require('express-session')
const connectMongoDB = require('./database/connection')
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');

dotenv.config()

const app = express();
const port = process.env.PORT || 4000

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(cors({ origin: true, credentials: true }))
app.use(errorHandler)

connectMongoDB()


// app.use((req,res,next) => {
//    console.log('logged as ', req.session);
//    next()
// })

app.use('/api', require('./routes/userRouter'));





app.listen(port, () => {
   console.log('server is running on port ',port);
})


module.exports = app;
