require("dotenv").config();
const express = require("express");
const connectToMongo = require("./dbConnection");
const cors = require("cors");
const  petRoutes = require ('./routes/suggestionRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api', petRoutes);


connectToMongo();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
