/* jshint esversion: 6 */
const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();


router.route('/')
  .post(function (req, res) {
    let productInfo = req.body;
    // if(productInfo.name && productInfo.price && productInfo.inventory){
    //   productsDB.addNewProduct(productInfo);
    //   productsDB.data.success.post = true;
    //   res.redirect('/products');
    // }else{
    //   res.redirect('/products/new');
    //   productsDB.data.success.post = false;
    // }


    productsDB.addNewProduct(productInfo)
      .then(products => {
      res.redirect('/products');
      })
     .catch (error => {
      console.log(error);
      });
  })

  .get(function (req, res) {
    productsDB.displayAllProducts()
      .then (products => {
      res.render('./products/index',
      {products:products});
      })
      .catch (error => {
      console.log(error);
      });

   });

      // productsDB.data.success.delete = false;

router.route('/new')
  .get(function (req, res) {
  res.render('./products/new', productsDB.data);
});

router.route('/:id')
  .put(function (req, res) {
    console.log('req2',req);
    let requestID = req.params.id;
  productsDB.editProduct(req)
  .then(products => {
    res.redirect(303, `/products/${requestID}/`);
  })
  .catch (error => {
    res.redirect(303, `/products/${requestID}/edit`);
  });

  })

  .delete(function (req, res) {
    console.log("has attempted to delete");
    let requestID = req.params.id;
    productsDB.deleteProduct(requestID)
      .then (products => {
        console.log("products");
        res.redirect(303, `/products`);
      })
      .catch (error => {
      console.log(error);
      });
  })



    .get(function (req, res) {
  let requestID = req.params.id;
  productsDB.findProductById(requestID)
      .then (products => {
        console.log(products);
        res.render('./products/product', products);
      })
      .catch (error => {
      res.redirect(303, '/products/error');
      });
  });





router.get('/:id/edit', (req, res) => {
  console.log("edit2");
  let requestID = req.params.id;
  productsDB.findProductById(requestID)
      .then (products => {
        console.log("hihi",products);
      res.render('./products/edit', products);
      })
      .catch (error => {
      console.log(error);
      });
});


module.exports = router;