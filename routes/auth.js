var express = require('express');
var router = express.Router();
var { signup, signin,  populateUser, getAllStoreOwner, isStoreOwner } = require('../controllers/auth')
const { check, validationResult } = require('express-validator');



router.post('/signup', [
    check("name", "Plz enter a username of length more than 2").isLength({ min: 3 }),
    check("email", "Plz enter a valid email").isEmail(),
    check("password", "Password must be atleast 5 characters").isLength({ min: 5 })
], signup)

router.post('/login', [
    check("email", "plz enter a valid email").isEmail(),
    check("password", "plz enter password").isLength({ min: 1 })
], signin)

router.get('/storeOwner', populateUser, isStoreOwner, getAllStoreOwner);

module.exports = router;
