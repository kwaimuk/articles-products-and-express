/* jshint esversion: 6 */
let ArticleList = [];

let articleUrl;

function addNewArticle(article) {
  articleUrl = encodeURI(article.title);
  article.urlTitle=articleUrl;
  ArticleList.push(article);
}

function findProductById(requestId){
  for(let i = 0; i < ArticleList.length; i++){
    if(ArticleList[i].id === requestId){
       return ArticleList[i];
    }
  }
}

function deleteProduct(requestId){
  for(let i = 0; i < ArticleList.length; i++){
    if(ArticleList[i].id === requestId){
      console.log("delep");
      ArticleList.splice(i, 1);
    }
  }
}

function editProduct(productToEdit, req) {
  if(req.body.name){
      productToEdit.name = req.body.name;
    }
    // check if has price
    if(req.body.price){
      productToEdit.price = req.body.price;
    }
    // check if has inventory
    if(req.body.inventory){
      productToEdit.inventory = req.body.inventory;
    }
}

module.exports = {
  data: {
    "products": ArticleList,
    success: {
      "delete": false,
      "post": true
    }
  },
  ArticleList,
  articleUrl,
  addNewArticle,
  findProductById,
  deleteProduct,
  editProduct,
};