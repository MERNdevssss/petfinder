const express=require('express');
const userRouter=require('./userRouter.js');
const adminRoutes = require("./adminRouter.js");
const petRouter=require('./petRouter.js');
const filterRouter=require('./filterRouter.js');
const router=express.Router();

router.use('/',userRouter);
router.use("/admin", adminRoutes);
router.use('/pets',petRouter);
router.use("/api", filterRouter);

module.exports=router;