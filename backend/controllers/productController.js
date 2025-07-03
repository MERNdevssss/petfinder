
const {uploadMultipleFiles} = require('../middlewares/imageFilesUpload.js');
//const { uploadMultipleFiles } = require('../middlewares/imageFilesUpload.js');
const { addQuantity, allProductsbyCategory, allProductsbyType, createProduct } = require('./productRepository.js');

const addProduct = async (req, res) => {
  console.log(req.body)
  try {
    const data = {...req.body};
    data.images = []
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }
    
    let urls = await uploadMultipleFiles(req.files)
    data.images = urls;

    const resp = await createProduct(data);
    if (resp.success) {
      return res.status(201).json({
        success: true,
        msg: "Product added successfully",
        res: resp.res,
      });
    } else {
      return res.status(400).json(resp.error);
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, msg: err.message });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await addQuantity(id);
    if (resp.success) {
      return res.status(200).json({
        success: true,
        msg: resp.msg,
      });
    } else {
      return res.status(resp.error.statusCode || 400).json(resp.error);
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

const getProductsbyCategory = async (req, res) => {
  const query = {...req.params}
  try {
    const resp = await allProductsbyCategory(query);
    if (resp.success) {
      return res.status(200).json({ success: true, res: resp.res });
    } else {
      return res.status(resp.error.statusCode || 404).json(resp.error);
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

const getProductsbyType = async (req, res) => {
  const query = {...req.params};
  try {
    const resp = await allProductsbyType(query);
    if (resp.success) {
      return res.status(200).json({ success: true, res: resp.res });
    } else {
      return res.status(resp.error.statusCode || 404).json(resp.error);
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = {getProductsbyCategory, getProductsbyType, addProduct,increaseQuantity}