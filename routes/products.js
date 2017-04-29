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
        console.log("then");
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
  let requestID = parseFloat(req.params.id);
  let productToEdit = productsDB.findProductById(requestID);
console.log("edit");
  if(productToEdit !== undefined){
    productsDB.editProduct(productToEdit, req);
    //I could render the edit page, but url will be ?_method=PUT-
    //    res.render('./products/edit', productToEdit);
    res.redirect(303, `/products/${productToEdit.id}/`);
  }else {
    res.redirect(303, '`/products/${productToEdit.id}/edit`');
  }
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
      console.log(error);
      });
  });
  // let requestID = parseInt(req.params.id);
  // console.log("ok");
  // let productRequested = productsDB.findProductById(requestID);
  // console.log("productRequested",productRequested);
  // if(productRequested){
  //   // let i = productList.indexOf(productRequested);
  //   // console.log("productsDB.data.products[i]", productsDB.data.products[i]);
  //   res.render('./products/product', productRequested);
  // }else{
  //   res.redirect(303, '/products/error');
  // }





router.get('/:id/edit', (req, res) => {
  console.log("edit2");
  let requestID = req.params.id;
  productsDB.findProductById(requestID)
      .then (products => {
        console.log(products);
      res.render('./products/edit', products);
      })
      .catch (error => {
      console.log(error);
      });
});


module.exports = router;