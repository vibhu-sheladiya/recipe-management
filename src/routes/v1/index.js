const express=require('express');
const userRoute= require('./user.route');
const recipeRoute= require('./recipe.route');
const router=express.Router();

router.use('/user',userRoute);

// recipe routes
router.use('/recipe',recipeRoute);

module.exports=router;