/* jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const productsRouter = require('./routes/products');
const PORT = 8888;
const app = express();

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine','hbs');


//get
app.get('/', (req,res) => {
  res.render('home',homeData);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use('/products',productsRouter);


app.listen(PORT, () => {
  console.log(`epxress serer running on ${PORT}`);
});