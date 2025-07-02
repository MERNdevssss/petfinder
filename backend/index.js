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
app.use("/api/pet", require("./routes/pet_routes"));
app.use("/api/images", require("./routes/uploadRoutes"));

connectToMongo();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
