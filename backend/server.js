import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import summaryRoutes from "./src/routes/summary.route.js"
import cookieParser from 'cookie-parser';
import passport from 'passport';


import authRoutes from "./src/routes/auth.route.js"


const app = express();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(passport.initialize()); 
import("./src/config/passport.js"); 

//Frontend


connectDB()


app.use("/api",summaryRoutes); 

app.use("/api/auth",authRoutes);






const PORT = process.env.PORT ;
app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`)
});