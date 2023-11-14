
const express = require('express');
const { createProduct, home, getProducts, deleteProduct, updateProduct, produtDetails, getProductById, getHomeProducts, getProductDetails } = require('../controllers/product');
const {productvalidation}=require('../validations/productValidation')
const router = express.Router();



router.post('/product/create_product',productvalidation,createProduct)

router.get('/product/get_products',getProducts);

router.get('/product/product_details/:id',produtDetails);

router.delete('/product/delete_product/:id',deleteProduct);

router.put('/product/update_product/:id',updateProduct);
router.get('/product/get_product/:id',getProductById);

//router.post('/product/all_products',AllProducts)

router.get('/',home)
router.get('/product/home_products/:page',getHomeProducts)
router.get('/product/:slug',getProductDetails)

module.exports=router

