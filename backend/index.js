require("dotenv").config();
const express=require('express');
const cors=require('cors');
const userRouter=require('./routes/userRouter.js');
const adminRoutes = require("./routes/adminRouter.js");
const petRouter=require('./routes/petRouter.js');
const cookieParser = require("cookie-parser");
const filterRouter=require('./routes/filterRouter.js');
const connectToMongo = require("./dbConnection");
const  petRoutes = require ('./routes/suggestionRoutes.js');


const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("API is running...");
});




app.use('/api', petRoutes);



connectToMongo();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/',userRouter);
app.use("/admin", adminRoutes);
app.use('/pets',petRouter);
app.use("/api", filterRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
