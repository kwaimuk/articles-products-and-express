/* jshint esversion: 6 */
const express = require('express');
const articlesDB = require('../db/articles');
let router = express.Router();
let productList = articlesDB.productList;

router.route('/')
  .post(function (req, res) {
    let articleInfo = req.body;
    if(articleInfo.title && articleInfo.body && articleInfo.author){
      articlesDB.addNewArticle(articleInfo);
      articlesDB.data.success.post = true;
      res.redirect('/articles');
    }else{
      res.redirect('/articles/new');
      articlesDB.data.success.post = false;
    }
  })

  .get(function (req, res) {
  res.render('./articles/index', articlesDB.data);
      // articlesDB.data.success.delete = false;
  });

router.route('/new')
  .get(function (req, res) {
  res.render('./articles/new', articlesDB.data);
});

router.route('/:title')
  .put(function (req, res) {
  let requestArticle = req.params.title;
  let articleToEdit = articlesDB.findArticleByTitle(requestArticle);
console.log("edit");
  if(articleToEdit !== undefined){
    articlesDB.editProduct(articleToEdit, req);
    //I could render the edit page, but url will be ?_method=PUT-
    //    res.render('./articles/edit', articleToEdit);
    res.redirect(303, `/articles/${articleToEdit.title}/`);
  }else {
    res.redirect(303, '/articles/${articleToEdit.title}/new');
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
  console.log("objects",articleResult.urlTitle);
  if(articleResult){
    res.render(`./articles/articles`, articleResult);
  }else{
    res.redirect(303, '/articles/error');
  }
      articlesDB.data.success.delete = false;
  });






router.get('/:id/edit', (req, res) => {
  console.log("edit2");
  let requestArticle = encodeURI(req.params.title);
  let articleRequested = articlesDB.findArticleByTitle(requestArticle);
  if(articleRequested){
    res.render('./articles/edit',articleRequested);
  }else{
    res.redirect(303, '/articles/error');
  }
});


module.exports = router;