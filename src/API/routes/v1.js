/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';


const express = require('express');
const router = express.Router();

const categories = require('../models/categories.js');
const products = require('../models/products.js');


function getModel(req,res,next){
  let model = req.params.model;

  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}
// specific for model data
router.param('model', getModel);
// custom REST Methods
router.get('/api/v1/:model',handelGetAll);
router.post('/api/v1/:model',handelPost);
router.get('/api/v1/:model/:id',handelGetOne);
router.put('/api/v1/:model/:id',handelUpdate);
router.delete('/api/v1/:model/:id',handelDelete);


// custom functions of REST Methods
function handelGetAll(req,res,next){
  req.model.get()
    .then(results=>{
      let count = results.length;
      res.json({count,results});
    }).catch(next);
}

function handelGetOne(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

function handelPost(req,res,next){
  req.model.post(req.body)
    .then(results=>{
      res.json(results);
    }).catch(next);
}

function handelDelete(req,res,next){
  let id = req.params.id;
  req.model.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}
function handelUpdate(req,res,next){
  let id = req.params.id;
  req.model.put(id, req.body)
    .then(record=>{
      res.json(record);
    }).catch(next);
}
module.exports = router;

