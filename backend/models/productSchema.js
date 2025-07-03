const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
      },
      pet_type:{
        type: String,
        enum: {
          values: ['dog', 'cat', 'rabbit', 'fish', 'bird', 'hamster'],
          message: '{VALUE} is not a valid category'
        },
        required: [true, 'Pet type is required'],
        
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be positive']
      },
      brand:{
        type: String,
        required: [true, 'Brand for the product is required']
      },
      category: {
        type: String,
        enum: {
          values: ['food','treats','accessories', 'toys', 'grooming', 'health', 'clothes'],
          message: '{VALUE} is not a valid category'
        },
        required: [true, 'Category is required']
      },
      size:{
        type: String,
        enum:{
          values: ['small', 'medium', 'large', 'extra_large', 'none'],
          message: '{VALUE} is not a valid quantity'
        },
      },
      description:{
        type:String,
      },
      seller:{
        type: String,
        required: [true, 'Seller\'s is required']
      },
      manufacturer:{
        type: String,
        required: [true, 'Manufacturer\'s details is required']
      },
      images:{
        type: [String],
        required: [true, 'Upload atleast one image of product']
      }

    });

const productModel = mongoose.model('products', productSchema);

module.exports = {productModel};