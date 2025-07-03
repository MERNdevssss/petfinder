const express=require('express');
const {handleUserSignup,handleUserLogin}=require('../../controllers/userController.js');

const userRouter=express.Router();

userRouter.post('/signup',handleUserSignup);
userRouter.post('/login',handleUserLogin);

module.exports=userRouter;