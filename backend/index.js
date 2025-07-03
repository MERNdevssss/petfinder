require("dotenv").config();
const express=require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser');

const userRouter=require('./routes/userRouter.js');
const adminRoutes = require("./routes/adminRouter.js");
const petRouter=require('./routes/petRouter.js');
const filterRouter=require('./routes/filterRouter.js');
const connectToMongo = require("./dbConnection");

const  petRoutes = require ('./routes/suggestionRoutes.js');
// const productRouter  = require('./src/features/pet_products/productsRouter.js');
// this is a single line comment 
const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));

const corsOrigin = {
  origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOrigin));


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/pet", require("./routes/pet_routes"));
app.use("/api/images", require("./routes/uploadRoutes"));

app.use('/api/pets', petRoutes);

// app.use('/products', productRouter);


connectToMongo();



app.use('/',userRouter);
app.use("/admin", adminRoutes);
app.use('/pets',petRouter);
app.use("/api", filterRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
