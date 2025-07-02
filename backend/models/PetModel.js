const mongoose=require('mongoose');

const PetSchema=new mongoose.Schema({
    name:{  //Golden Retriever, etc.
        type:String,
        required:true
    },
    seller:{
        type:String,    //johndoe@example.com
        required:true
    }
});

const Pet=mongoose.model("Pet",PetSchema);
module.exports=Pet;