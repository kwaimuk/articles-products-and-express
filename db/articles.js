/* jshint esversion: 6 */
let articleList = [];

let articleUrl;

function addNewArticle(article) {
  articleUrl = encodeURI(article.title);
  article.urlTitle=articleUrl;
  articleList.push(article);
}

function findArticleById(articleURL){
  for(let i = 0; i < articleList.length; i++){
    if(articleList[i].id === articleURL){
       return articleList[i];
    }
  }
}

function deleteArticle(articleURL){
  for(let i = 0; i < articleList.length; i++){
    if(articleList[i].id === articleURL){
      console.log("delep");
      articleList.splice(i, 1);
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
    "products": articleList,
    success: {
      "delete": false,
      "post": true
    }
  },
  articleList,
  articleUrl,
  addNewArticle,
  findArticleById,
  deleteArticle,
  editProduct,
};