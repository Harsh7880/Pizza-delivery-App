const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

// Assets
app.use(express.static('public'))

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


// routes

app.get('/' ,(req,res) =>{
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.get('/register', (req, res) => {
    res.render('auth/register')
})

app.get('/cart', (req, res) => {
    res.render('customers/cart')
})




// listning to server on port
app.listen(3000, () =>{
    console.log(`server is running on post ${3000}`);
})