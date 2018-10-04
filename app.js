const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

const port = 3000;
const app = express();

//view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//express middleware for setting up the static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//hbs partials 
hbs.registerPartials(__dirname + '/views/partials');

let users = [
    {
        name: 'karan',
        email: 'karan@mail'
    },
    {
        name: 'riyansh',
        email: 'riyansh@mail'
    },
    {
        name: 'aman',
        email: 'aman@mail'
    }
]

app.get('/', (req, res)=>{
    res.render('index', {
        users: users
    });
});

app.post('/users', (req, res)=>{
    users.push({
        name: req.body.first_name,
        email: req.body.email
    });
    res.redirect('/');
})




//to listen on a port
app.listen(port, ()=>{
    console.log('server started on port 3000');
});