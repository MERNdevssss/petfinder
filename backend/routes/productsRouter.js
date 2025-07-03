const express =  require('express');
const { addProduct, getProductsbyCategory, getProductsbyType ,increaseQuantity } = require('../controllers/productController.js');
const { upload } = require('../middlewares/imageFilesUpload.js');

const router = express.Router();

router.route('/:pet_type/:category').get(getProductsbyCategory);
router.route('/:pet_type').get(getProductsbyType);


//admin routes
router.route('/admin/addproduct').post(upload.array('images', 5), (req, res)=>{
    console.log(req.body)
});
//router.route('/admin/addproduct').post(upload.array('images', 5), addProduct);
router.route('/admin/:id').get(increaseQuantity);


module.exports = router;