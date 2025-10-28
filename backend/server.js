import express from 'express';
import dotnev from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import summaryRoutes from "./src/routes/summary.route.js"
import cookieParser from 'cookie-parser';

import authRoutes from "./src/routes/auth.route.js"

dotnev.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB()


app.use("/api",summaryRoutes);
app.use("/api/auth",authRoutes);






const PORT = process.env.PORT ;
app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`)
});