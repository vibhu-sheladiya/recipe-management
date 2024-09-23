const express=require('express');

const {authController}=require('../../controllers');

const router=express.Router();

// create user 
router.post("/create-user",
authController.registerUser
);

// login user
router.post("/login-user",
  authController.login
  );


module.exports=router;
