/* jshint esversion: 6 */
let productList = [];

let productID = 1;

function addNewProduct(product) {
  product.id = productID;
  productID++;
  productList.push(product);
  console.log("wwwwww",productList);
}

// }

module.exports = {
  data: {
    "products": productList,
    // success: {
    //   "delete": false,
    //   "post": true
    // }
  },
  productList,
  productID,
  addNewProduct,
  // findProductById,
  // deleteProduct,
  // editProduct,
};