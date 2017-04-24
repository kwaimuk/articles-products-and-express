/* jshint esversion: 6 */
let articleList = [];

let articleUrl;

function addNewArticle(article) {
  articleUrl = encodeURI(article.title);
  article.urlTitle = articleUrl;
  articleList.push(article);
}

function findArticleByTitle(articleURL){
  for(let i = 0; i < articleList.length; i++){
    if(articleList[i].urlTitle === articleURL){

  console.log("found");
       return articleList[i];
    }
  }
}

function deleteArticle(articleURL){
  for(let i = 0; i < articleList.length; i++){
    if(articleList[i].urlTitle === articleURL){
      console.log("delep");
      articleList.splice(i, 1);
    }
  }
}

function  editArticle(articleToEdit, req) {
  // console.log("hi");
    if(req.body.title){
      articleToEdit.title = req.body.title;
    }
    if(req.body.body ){
      articleToEdit.body = req.body.body;
    }
    if(req.body.author){
      articleToEdit.author = req.body.author;
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
  findArticleByTitle,
  deleteArticle,
  editArticle,
};