/* jshint esversion: 6 */
const db = require('./connections');
let productList = [];

let newProductId = 1;

function addNewProduct(product) {

let name =product.name;
let price =product.price;
let inventory =product.inventory;
  return db.any('INSERT INTO products(name, price, inventory) VALUES ($1, $2, $3)',
                [name, price, inventory]);

}

// function findProductById(requestId){
//   for(let i = 0; i < productList.length; i++){
//     if(productList[i].id === requestId){
//        return productList[i];
//     }
//   }
// }

function findProductById(requestID){
  console.log("requestID1", requestID);
  return db.one('SELECT * FROM products WHERE id = $1',[requestID]);
}

function deleteProduct(requestID){
 console.log("requestID2", requestID);
  return db.result('DELETE FROM products WHERE id = $1',[requestID]);
}

function editProduct(req) {
  console.log('req',req.params.id);
let name =req.body.name;
let price =req.body.price;
let inventory =req.body.inventory;
let id = req.params.id;
console.log("id",price);
  return db.one('UPDATE products SET name = $2, price = $3, inventory = $4 WHERE id = $1',[id,name, price, inventory]);

  // if(req.body.name){
  //     productToEdit.name = req.body.name;
  //   }
  //   // check if has price
  //   if(req.body.price){
  //     productToEdit.price = req.body.price;
  //   }
  //   // check if has inventory
  //   if(req.body.inventory){
  //     productToEdit.inventory = req.body.inventory;
  //   }
}

function displayAllProducts(){
return db.any('SELECT * FROM products');

}

module.exports = {
  data: {
    "products": productList,
    success: {
      "delete": false,
      "post": true
    }
  },
  productList,
  newProductId,
  addNewProduct,
  findProductById,
  deleteProduct,
  editProduct,
  displayAllProducts,
};

