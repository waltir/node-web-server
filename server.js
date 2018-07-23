const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// SETTING UP EXPRESS STATIC DIRECTORY
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // Setting up handlebars

// SETTING UP EXPRESS LOGGER - LOGS EACH REQUEST TO SERVER.LOG
app.use((req, res, next) => {
  var now = new Date().toString();
  var ip = req.connection.remoteAddress;
  var log = `Date: ${now}: ${req.method} ${req.url} ${ip}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    next();
    if (err) {
      console.log('Unable to append to server.log');
    }
  })
});

// MAINTINENCE NOTIFICATION - UNCOMMENT TO PUT THE SITE IN MAINTENCE MODE
// app.use((req, res, next) => {
//     res.render('maintence.hbs', {
//       pageTitle: 'Maintence Page',
//     });
// });

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('Hello Express');
    res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to the website!'
    });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

var errorMessage = {
  error: 'Page not found'
}

app.get('/bad', (req, res) => {
  res.send(errorMessage.error);
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});