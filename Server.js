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



const allowedOrigins = [
  'http://localhost:5173', 
  'https://real-estate-website-frontend-brown.vercel.app',
];

app.use(cors({
  origin: '*', 
}));


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true, 
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth', authRoute)
app.use('/api/property', propertyRoute)
app.use('/api/inquiry', inquiryRoutes)

connectDB();

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

