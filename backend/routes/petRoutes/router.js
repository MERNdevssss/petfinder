const express=require('express');

const router=express.Router();

router.use('/',require('./pet_routes.js'));
router.use('/images',require('./uploadRoutes.js'));

module.exports=router;