const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
dotenv.config();
const app = express();
const authRoute = require('./routes/authRoutes')
const propertyRoute = require("./routes/propertyRoute")
const inquiryRoutes = require("./routes/inquiryRoutes")


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth', authRoute)
app.use('/api/property', propertyRoute)
app.use('/api/inquiry', inquiryRoutes)

connectDB();

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

