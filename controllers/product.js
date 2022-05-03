const Product = require('../models/product')



// Create
exports.createProduct = (req, res) => {
  if (!req.body || !req.body.name) return res.status(404).json({
    error: true,
    message: "Name is required !"
  })
  const _task = {
    name: req.body.name,
    description: req.body.description,
    price : req.body.price,
    createdBy: req.user._id
  }

  const newProduct = new Product(_task)

  newProduct.save((err, task) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save product in DB"
      })
    };
    return res.json({
      error: false,
      message: "Successfully saved Product.",
      data: task
    });
  })
}

// Read
exports.getAllProducts = (req, res) => {
  Product.find()
    .exec((err, _tasks) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "NO product FOUND",
        });
      }
      res.status(200).json({
        error: false,
        data: _tasks,
        message: "Successfully Extracted all Products"
      });
    });
};


exports.getProductById = (req, res, next, id) => {
  
  Product.findById(id).exec((err, item) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: "unable to get product by id in Database"
      });
    }
    req.Product = item;
    console.log("Line No 63 -> Old product : ", item)
    next();
  })
}

// Update
exports.updateProductById = (req, res) => {
  // Currently this only updates the status of the item
  
  const productId = req.Product._id;
  let newProduct = req.body;
  console.log(" Line No-74 -> new product :", newProduct)
  if (!productId || !newProduct) {
    return res.status(404).json({
      error: true,
      message: "Product Id and updated params are requied for Updation"
    })
  } else {
    let newProduct = req.body
    const filter = { _id: productId }
    const updatedItem = {
      name: newProduct.name ? newProduct.name : req.Product['name'],
      description: newProduct.description ? newProduct.description : req.Product['description'],
      price: newProduct.price ? newProduct.price : req.Product['price']
    }
    Product.findOneAndUpdate(filter, updatedItem, { new: true }, (err, _item) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: err.message ? err.message : "Unable to update product !"
        })
      } else {
        console.log("Line No-95 -> Product update successfully.\n ",_item)
        return res.status(200).json({
          error: false,
          message: "Successfully updated product.",
          data: _item
        })
      }
    })
  }
}

