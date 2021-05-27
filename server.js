require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const flash = require('express-flash');
const MongodbStore = require('connect-mongo');
const passport = require('passport')

// DataBase Connection
const url = 'mongodb://localhost/pizza-app';

mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology:true
});
   const connection = mongoose.connection;
   connection.once('open',()=>{
       console.log('Database Sucessfully Connected.....');
   }).catch(err =>{
       console.log('connection failed...');
   });




//Session congif and session store
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongodbStore.create({
     mongoUrl: url
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24} // 24 hours
}))

// passport config
const passportInit = require('./app/config/passport');

passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())



app.use(flash());

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Global Middlewere
app.use((req, res, next) =>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app)

// listning to server on port
app.listen(3000, () =>{
    console.log(`server is running on post ${3000}`);
})