/* jshint esversion: 6 */
const express = require('express');
const articlesDB = require('../db/articles');
let router = express.Router();
let productList = articlesDB.productList;

router.route('/')
  .get(function (req, res) {
  res.render('./articles/index', articlesDB.data);
  })

  .post(function (req, res) {
    //this will reset delete status
      articlesDB.data.success.delete = false;
    let articleInfo = req.body;
    if(articleInfo.title && articleInfo.body && articleInfo.author){
      articlesDB.addNewArticle(articleInfo);
      articlesDB.data.success.post = true;
      res.redirect('/articles');
    }else{
      res.redirect('/articles/new');
      articlesDB.data.success.post = false;
    }
  });


router.route('/new')
  .get(function (req, res) {
    //this will reset delete status
      articlesDB.data.success.delete = false;
  res.render('./articles/new', articlesDB.data);

});

router.route('/:title')
  .put(function (req, res) {
  let requestArticle = encodeURI(req.params.title);
  let articleToEdit = articlesDB.findArticleByTitle(requestArticle);
console.log("articleToEdit",articleToEdit);
  if(articleToEdit !== undefined){
    articlesDB.editArticle(articleToEdit, req);
    res.redirect(303, `/articles/${articleToEdit.urlTitle}/`);
  }else {
    res.redirect(303, '/articles/${articleToEdit.urlTitle}/edit');
  }
})

  .delete(function (req, res) {
    console.log("has attempted to delete");
    let articleUrl = encodeURI(req.params.title);
  let articleToEdit = articlesDB.findArticleByTitle(articleUrl);
  if(articleToEdit){
    articlesDB.deleteArticle(articleUrl);
    articlesDB.data.success.delete = true;
    res.redirect(303,'/articles');
  }else{
    res.redirect(303,'/articles/error');
  }
})

    .get(function (req, res) {
  let requestArticle = encodeURI(req.params.title);
  let articleResult = articlesDB.findArticleByTitle(requestArticle);
  if(articleResult){
    res.render(`./articles/articles`, articleResult);
  }else{
    res.redirect(303, '/articles/error');
  }
      articlesDB.data.success.delete = false;
  });




router.get('/:title/edit', (req, res) => {
  let requestArticle = encodeURI(req.params.title);
  console.log("requestArticle",requestArticle);
  let articleRequested = articlesDB.findArticleByTitle(requestArticle);
    console.log("articleRequested",articleRequested);
  if(articleRequested){
    res.render('./articles/edit',articleRequested);
  }else{
    res.redirect(303, '/articles/error');
  }
});


module.exports = router;