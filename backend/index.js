require("dotenv").config();
const express=require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser');

// const userRouter=require('./routes/userRouter.js');
// const adminRoutes = require("./routes/adminRouter.js");
// const petRouter=require('./routes/petRouter.js');
// const filterRouter=require('./routes/filterRouter.js');
const connectToMongo = require("./dbConnection");
const userRoutes=require('./routes/userRoutes/router.js');
const  petRoutes = require ('./routes/suggestionRoutes.js');
const productRouter  = require('./routes/productsRouter.js');

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/pet", require("./routes/petRoutes/router.js"));


app.use('/api/suggest-pet', require('./routes/suggestionRoutes.js'));
app.use('/api/products', productRouter);


connectToMongo();

app.use('/api/user',userRoutes);

// app.use('/',userRouter);
// app.use("/admin", adminRoutes);
// app.use('/pets',petRouter);
// app.use("/api", filterRouter);



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
