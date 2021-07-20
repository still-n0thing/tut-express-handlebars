// Imports
const express = require('express');
const expbs = require('express-handlebars');
const path = require('path');

// Express app
const app = express();

// For adding css
app.use(express.static('public'));

// Custom helpers
const hbs = expbs.create({
    // Copied from engine
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/mainLayout'),
    partialsDir: path.join(__dirname, 'views/pieces'),
    extname: '.hbs',

    // new custom helper
    helpers: {
        calculation: (value) => {
            return value+7;
        },
        bigger: (value, options) => {
            return "<h2>"+options.fn({ test: value , prove: 'blabla'})+"</h2>";
        },
        list: (value, options) => {
            let out = "<ul>";

            for(let i = 0; i < value.length; i++){
                out += "<li>"+options.fn(value[i])+"</li>";
            }
            return out + "</ul>";
        },
    }

});

/*
by default 
> main is in layouts
> header, footer other partials are in partials
> all hbs were handlebars by default
*/

// Use handlebar for template engine and set view engine layouts
app.engine('hbs', hbs.engine); // this doesnt need defaultLayout , layoutsDir, pratialsDirs
app.set('view engine', 'hbs');

// Routing
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
        name: "Remaru Tempist",
        age: 31,
        isDisplayName: true,
        isAgeEnabled: true,
        people: [
            { firstName: "MS", lastName: "Dhoni" },
            { firstName: "Rohit", lastName: "Sharma" },
            { firstName: "David", lastName: "Warner" }            
        ],
        test: '<p>This should work </p>',
        test1: '<h3>Welcome to India</h3>',
        style: 'home.css'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        discription: "Some random text here that is needed",
        style: 'about.css'
    });
});

app.get('/dashboard', (re, res) => {
    res.render('dashboard', {
        title: "Dashboard",
        isListEnabled: false,
        author:{
            firstName: "Cris",
            lastName: "Martin",
            project: {
                name: "Build Random Quote",
            }
        },
        style: 'dashboard.css',
    });
});

app.get('/each/helper', (req, res) => {
    res.render('contact', {
        people: [
            "James",
            "Peter",
            "Roy",
            "Raj",
        ],
        user: {
            username: 'Josphe Jostar',
            age: 40,
            phone: 9999999999,
        },
        lists: [
            {
                items: ["Orange", "Apple", "Pineapple"]
            },
            {
                items: ["Coke", "Pepsi", "Sprite"]
            }
        ],
    });
});

app.get('/look', (req, res) => {
    res.render('lookup', {
        user: {
            username: 'Josphe Jostar',
            age: 40,
            phone: 9999999999,
        },
        people: [
            "James",
            "Peter",
            "Roy",
            "Raj",
        ],
    });
}); 

// Server at provided port
app.listen(8000, () => {
    console.log('server is starting at port ', 8000);
});
