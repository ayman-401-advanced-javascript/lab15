/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const mongoose = require('mongoose');
require('./categories-schema.js');
const products = mongoose.Schema({
  categoryName: {type:String, required: true},
  name: {type:String, required: true},
  price: { type: Number, required: true },
  weight: { type: Number},
  quantityInStock: {type: Number, required: true},
},{toOBject:{virtuals: true}, toJSON: {virtuals: true}});

// products.virtual('actualCategory',{
//   ref: 'categories',
//   localField: 'categoryName',
//   foreignField: 'name',
//   justOne: false,
// });

// products.pre('findOne', function (){
//   try{
//     this.populate('actualCategory');
//   }catch(e){
//     console.error(e);
//   }
// });
module.exports = mongoose.model('products',products);