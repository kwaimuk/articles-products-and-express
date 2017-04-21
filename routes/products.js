/* jshint esversion: 6 */
const express = require('express');
const productDB = require('../db/products');

const router = express.Router();
let productList = productDB.productlist;
console.log("productList",productList);
//:id to designate req.params.id
router.route('/')

  .post(function (req, res) {
    let productInfo = req.body;
    if(productInfo.name&&productInfo.price&&productInfo.inventory){
    productDB.addNewProduct(productInfo);
    productDB.data.success.post = true;
    res.redirect('/products');
    }else{
      res.redirect('/products/new');
    productDB.data.success.post = false;
    }
  })

  .get(function (req, res) {
    res.send('post /');
  });


router.route('/new')
  .get(function (req, res) {
//new.hbs
    res.send('/products');

  });

router.route('/:id')
  .put(function (req, res) {
    let findByID = req.params.id;
    let matchID = productDB.findProductById(findByID);
      if(productToEdit !== undefined){
      productsDB.editProduct(productToEdit, req);
      res.redirect(303, `/products/${matchID}/edit`);
      }else{
      res.redirect(303, '/products/new');
      }
  })

  .delete(function (req, res) {
    res.send(`delete id`);
  })

    .get(function (req, res) {
    res.send(`delete id`);
  });

router.route('/:id/edit',(req, res) => {
  let requestId = parseInt(req.params.id);
  let productRequested = productsDB.findProductById(requestId);
  if(productRequested){
    let i = productList.indexOf(productRequested);
    res.render('./products/edit', productsDB.data.products[i]);
  }else{
    res.redirect(303, '/products/error');
  }
  });




module.exports =router;