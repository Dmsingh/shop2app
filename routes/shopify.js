const express = require("express");
const router = express.Router();
var { store,products,createproduct,updateproduct} = require('../controllers/shopify')
router.get('/store',store);
router.get('/products',products);
router.post('/addItem',createproduct);
router.put('/updateItem/:id',updateproduct);




module.exports = router;