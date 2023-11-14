const {body} = require("express-validator");
module.exports.productvalidation =[
    
    body("title").not().isEmpty().trim().withMessage("title is required"),
    body("price").not().isEmpty().trim().withMessage("Price is required"),
    body("image").not().isEmpty().trim().withMessage("image is required"),
    body("category").not().isEmpty().trim().withMessage("category is required"),
    body("description").not().isEmpty().trim().withMessage("description is required"),
    // body("sizes").not().isEmpty().trim().withMessage("size is required"),
    // body("colors").not().isEmpty().trim().withMessage("color is required"),
    body("discount").not().isEmpty().trim().withMessage("title is required"),
    body("stock").not().isEmpty().trim().withMessage("title is required"),
    // body("userName").not().isEmpty().trim().withMessage("User name is required"),
    // body("password").not().isEmpty().isLength({min: 6, max:50}).withMessage("correct Password is required")
    ];