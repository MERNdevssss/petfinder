const mongoose = require("mongoose");


const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PetFinder",
    })
    .then(() => {
      console.log(`connected ${process.env.MONGO_URI}`);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connectToMongo;
