const { productModel } = require('./productSchema.js');

const createProduct = async (data) => {
  try {
    const newProduct = new productModel({ ...data });
    await newProduct.save();
    console.log('product created in db', newProduct);
    return {
      success: true,
      res: newProduct
    };
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: {
        statusCode: 400,
        msg: e.message,
        details: e.errors || null
      }
    };
  }
};

const addQuantity = async (id) => {
  try {
    const prod = await productModel.findById(id);
    if (prod) {
      prod.quantity += 1;
      await prod.save(); // awaited!
      return { success: true, msg: 'Quantity Increased' };
    } else {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Product not found for the given ID"
        }
      };
    }
  } catch (e) {
    return {
      success: false,
      error: {
        statusCode: 400,
        msg: e.message || "Error increasing quantity"
      }
    };
  }
};

const allProductsbyType = async (query) => {
  try {
    const products = await productModel.find(query);
    console.log(products)
    if (products.length > 0) {
      return { success: true, res: products };
    } else {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: 'No products found matching your query'
        }
      };
    }
  } catch (err) {
    return {
      success: false,
      error: {
        statusCode: 500,
        msg: err.message || 'Internal Server Error',
        details: err
      }
    };
  }
};

const allProductsbyCategory = async (query) => {
  try {
    const products = await productModel.find(query);
    if (products.length > 0) {
      return { success: true, res: products };
    } else {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: 'No products found matching your query'
        }
      };
    }
  } catch (err) {
    return {
      success: false,
      error: {
        statusCode: 500,
        msg: err.message || 'Internal Server Error',
        details: err
      }
    };
  }
};


module.exports = {createProduct, addQuantity, allProductsbyCategory, allProductsbyType}