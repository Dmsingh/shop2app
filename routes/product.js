const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProductById} = require('../controllers/product');
const { populateUser } = require('../controllers/auth')

router.param('productId', getProductById);


router.post("/product/create", populateUser, createProduct);

router.get("/product/getall", populateUser, getAllProducts);

router.put('/product/update/:productId', populateUser, updateProductById);


module.exports = router;