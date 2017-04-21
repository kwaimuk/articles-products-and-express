/* jshint esversion: 6 */
const express = require('express');
const productDB = require('../db/products');
console.log(productDB);
const router = express.Router();
let productList = productDB.productlist;
console.log("55",productList);
//:id to designate req.params.id
router.route('/')

  .post(function (req, res) {
    let productInfo = req.body;
    productDB.addNewProduct(productInfo);
    // productDB.data.success.post = true;
    console.log("pI",productInfo);
    res.redirect('/products');
  })

  .get(function (req, res) {

    res.send('post /');
  });

router.route('/new')
  .get(function (req, res) {

    res.send('/products');

  });

router.route('/:id')
  .put(function (req, res) {
    res.send(`get id?`);

  })

  .delete(function (req, res) {
    res.send(`delete id`);
  })

    .get(function (req, res) {
    res.send(`delete id`);
  });

router.route('/:id/edit')
    .get(function (req, res) {
    res.send(`delete id`);
  });




module.exports =router;