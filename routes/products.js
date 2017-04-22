/* jshint esversion: 6 */
const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();
let productList = productsDB.productList;

router.route('/')
  .post(function (req, res) {
    let productInfo = req.body;
    productInfo.price = parseFloat(productInfo.price);
    productInfo.inventory = parseFloat(productInfo.inventory);

    if(productInfo.name && productInfo.price && productInfo.inventory){
      productsDB.addNewProduct(productInfo);
      productsDB.data.success.post = true;
      res.redirect('/products');
    }else{
      res.redirect('/products/new');
      productsDB.data.success.post = false;
    }
  })

  .get(function (req, res) {
  res.render('./products/index', productsDB.data);
      // productsDB.data.success.delete = false;
  });

router.route('/new')
  .get(function (req, res) {
  res.render('./products/new', productsDB.data);
});

router.route('/:id')
  .put(function (req, res) {
  let requestId = parseFloat(req.params.id);
  let productToEdit = productsDB.findProductById(requestId);

  if(productToEdit !== undefined){
    productsDB.editProduct(productToEdit, req);
    res.redirect(303, `/products/${productToEdit.id}`);
  }else {
    res.redirect(303, '/products/new');
  }
})

  .delete(function (req, res) {
  let requestId = parseFloat(req.params.id);
  let productToEdit = productsDB.findProductById(requestId);
  if(productToEdit){
    productsDB.deleteProduct(requestId);
    productsDB.data.success.delete = true;
    console.log("has attempted to delete");
    res.redirect(303,'/products');
  }else{
    res.redirect(303,'/products/error');
  }
})

    .get(function (req, res) {
  let requestId = parseInt(req.params.id);
  let productRequested = productsDB.findProductById(requestId);
  if(productRequested){
    let i = productList.indexOf(productRequested);
    res.render('./products/product', productsDB.data.products[i]);
  }else{
    res.redirect(303, '/products/error');
  }
      // productsDB.data.success.delete = false;
  });






router.get('/:id/edit', (req, res) => {
  let requestId = parseFloat(req.params.id);
  let productRequested = productsDB.findProductById(requestId);
  if(productRequested){
    let i = productList.indexOf(productRequested);
    res.render('./products/edit', productsDB.data.products[i]);
  }else{
    res.redirect(303, '/products/error');
  }
});


module.exports = router;