const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const session = require('express-sessions');

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

// Assets
app.use(express.static('public'))

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app)

// listning to server on port
app.listen(3000, () =>{
    console.log(`server is running on post ${3000}`);
})