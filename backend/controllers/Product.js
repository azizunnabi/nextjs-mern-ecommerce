const { validationResult } = require("express-validator");
const ProductModal = require("../models/Product.js");
const { Params } = require("react-router-dom");
const { response } = require("express");
const { slugify } = require("../utils/index.js");


// insert products in database
module.exports.createProduct = async (request, response) => {
  const errors = validationResult(request);
  console.log(request.body)
  const {title,price,image,category,description,sizes,colors,discount,stock}=request.body
  if (errors.isEmpty()) {
    console.log('validations passed')
    try{
      const slug = slugify(title)
     console.log(slug)
      const checkSlug=await ProductModal.findOne({slug})
      
      const checkTitle=await ProductModal.findOne({title})
      if(checkTitle){
        return res.status(400).json({error:"please create unique title"})
      }
      if(checkSlug){
        return res.status(400).json({error:"please create unique slug"})
      }
      const newProductModal ={
         slug,
        title:title,
        price:price,
        image:image,
        category:category,
        description:description,
        sizes:sizes,
        colors:colors,
        discount:discount,
        stock:stock
        
      }
      const product=await ProductModal.create(newProductModal)
      if(product){
        //console.log("data inserted successfully")
        return response.status(201).json("product created")
      }else{
       return response.status(400).json({error: "product not created"})
        
      }
      //This should be to removed
      //return response.status(201).send(product)
  }catch (error) {
    console.log('validations failed')
    console.log(error.message)
    response.status(500).send({message:error.message})
  }
  }else {
    console.log("failed")
    return response.status(400).json({error: errors.array()})
   
   }
  
 
 
  };
  


  //get all products
  module.exports.getProducts=async(request,response)=>{

    try {
      const getAllProducts=await ProductModal.find({})
      return response.status(200).json(getAllProducts)
    } catch (error) {
      return response.status(400).json({error:error.message})
    }
    //this should be to removed
    // return response.status(200).json({msg: "get products"})
  }

  //product details
  module.exports.produtDetails=async(request,response)=>{
    
    //const cursor = db.collection('inventory').find({ status: 'D' });
    try {
      const {id} = request.params
      
      const productDetails=await ProductModal.findOne({_id:id});
    return response.status(200).json({productDetails})
    } catch (error) {
      return response.status(400).json({error:error.message})
    }
  }


  //Delete products
  //get all products
  module.exports.deleteProduct=async(request,response)=>{
    const { id } = request.params;
    if(!id || id ===""){
      return response.status(400).json({msg: "id is required"})
    }

    try {
      
      const deleteProduct=await ProductModal.findByIdAndDelete({ _id:id})
      if(deleteProduct){
        
      return response.status(200).json({msg: "Product deleted successfullys"})
      }
    } catch (error) {
      return response.status(400).json({error:error.message})
    }
    
    
   
    
  }



//update product
module.exports.updateProduct=async(request,response)=>{
  
  const errors= validationResult(request);
  if(errors.isEmpty()){
    try {
      const { id } = request.params;
  const {title,price,image,category,description,sizes,colors,discount,stock}=request.body
  const slug = slugify(title)
     console.log("slug in updat",slug)
      const checkSlug=await ProductModal.findOne({slug})
      
      const checkTitle=await ProductModal.findOne({title})
      if(checkTitle){
        return res.status(400).json({error:"please create unique title"})
      }
      if(checkSlug){
        return res.status(400).json({error:"please create unique slug"})
      }
      await ProductModal.findOneAndUpdate(
        //and should be to removed as this is one id
        // { $and:[{_id:id}]},
        {_id:id},
        {
          $set:{
            slug,title,price,image,category,description,sizes,colors,discount,stock
          },
        }
        )
        
        response.status(200).json({ msg: "product has been updated" });
    } catch (error) {
      return response.status(400).json({error:error.message})
    }
  }else{
    
    return res.status(200).json({ error: errors.array() });
  }
  }

  //get single product by id
  module.exports.getProductById=async(request,response)=>{
    
    //const cursor = db.collection('inventory').find({ status: 'D' });
    try {
      const {id} = request.params
      
      const singleProduct=await ProductModal.findById(id);
    return response.status(200).json({singleProduct})
    } catch (error) {
      return response.status(500).json({error:error.message})
    }
  }
  
  
 module.exports.getHomeProducts= async(req,res)=>{
  try {
    const {page}=req.params
    const perPage=8
    const skip = (page - 1) * perPage;
    const total = await ProductModal.find({}).countDocuments()

    const products=await ProductModal.find({}).skip(skip).limit(perPage)
    return res.status(200).json({products,total})
  } catch (error) {
    
    return res.status(500).json({error:error.message})
  }
  
 }
  

  module.exports.home=async (request, response)=>{
    return response.status(200).send({msg: "yes things are working"})
    }



module.exports.getProductDetails = async (req,res)=>{
  const {slug}=req.params
  if(!slug || slug=== ""){
    return res.status(400).json({error:"slug is required"})
  }
  try {
    const details = await ProductModal.findOne({slug})
    if(!details){
      return res.status(404).json({error:"details not found"})
    }
    return res.status(200).json(details)
  } catch (error) {
    res.status(500).json({error: "server internal error"})
    
  }
}
   // module.exports={home}
  // Export the controller function
 // module.exports = { createProduct };
  