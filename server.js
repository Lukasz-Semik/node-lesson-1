const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log(err);
  });
  next();
})

// app.use((req, res, next) => {
//   res.render('maint.hbs');
// })
//order of middleware is important! fire in the order.
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>hello world</h1>');
  // res.send({
  //   name: 'Luki',
  //   likes: ['dev', 'music', 'waterspors'],
  // })
  res.render('home.hbs', {
    pageTitle: 'About Page',
    welcome: 'yo, yo, yo',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'ERROR'
  })
});

app.listen(3000, () => {
  console.log('app on 3000');
})
