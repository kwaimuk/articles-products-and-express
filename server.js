/* jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const productsRouter = require('./routes/products');
const PORT = 8888;
const app = express();

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine','hbs');

app.use(express.static('./'));
//get
app.get('/', (req,res) => {
  res.render('home');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/products',productsRouter);

app.get("*",(req,res) => {
  res.send('404');
});

app.listen(PORT, () => {
  console.log(`epxress serer running on ${PORT}`);
});