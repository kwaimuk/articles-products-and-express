/* jshint esversion: 6 */
let productList = [{ name: 'yes', price: 19.99, inventory: 2, id: 1 }];

let productID = 1;

function addNewProduct(product) {
  product.id = productID;
  product.price = parseFloat(product.price);
  product.inventory = parseFloat(product.inventory);
  productID++;
  productList.push(product);
console.log("post",productList);
}

function findProductById(id){
  id= parseFloat(id);
  for(let i = 0; i < productList.length; i++){
    console.log("0",productList[0].id);
    if(productList[i].id === id ){
      console.log("true", id);
       return id;
    }
  }
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
  productID,
  addNewProduct,
  findProductById,
  // deleteProduct,
  // editProduct,
};