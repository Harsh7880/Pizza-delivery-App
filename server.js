const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

// Assets
app.use(express.static('public'))

// routes
app.get('/' ,(req,res) =>{
    res.render('home')
})

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');



// listning to server on port
app.listen(3000, () =>{
    console.log(`server is running on post ${3000}`);
})