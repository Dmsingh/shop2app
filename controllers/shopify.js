const axios=require('axios')
const shopifyProduct = require('../models/product')

const config={headers:{
    "Content-Type":"application/json",
    "X-Shopify-Access-Token":"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"
}}

exports.store = async(req, res)=>{
  await axios.get(" https://shop2dm.myshopify.com/admin/api/2022-04/shop.json",config)
  .then(response=>{
      console.log(response)
      return res.json(response.data.shop)
  })
  .catch(err=>{
    console.log(err)
    return res.json(err)
})
}
exports.products = async(req, res)=>{
    await axios.get(" https://shop2dm.myshopify.com/admin/api/2022-04/products.json",config)
    .then(response=>{
        console.log(response)
        return res.json(response.data)
    })
    .catch(err=>{
      console.log(err)
      return res.json(err)
  })
  }
exports.createproduct = async(req, res)=>{
      const product=req.body
    await axios.post(" https://shop2dm.myshopify.com/admin/api/2022-04/products.json",product,config)
    .then(response=>{
        console.log("Line no 33->",response)
        return res.json(response.data)
    })
    .catch(err=>{
      console.log("Line no 33->",err)
      return res.json(err)
  })
  }
exports.updateproduct = async(req, res)=>{
    const product=req.body
    const id=(req.params.id)
   
  await axios.put(`https://shop2dm.myshopify.com/admin/api/2022-04/products/${id}.json`,product,config)
  .then(response=>{
      console.log("Line no 46-> updated product",response.data)
      return res.json(response.data)
  })
  .catch(err=>{
    console.log("Line no 53->",err)
    return res.json(err)
})
}
