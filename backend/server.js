import express from 'express';
import dotnev from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import summaryRoutes from "./src/routes/summary.route.js"


dotnev.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB()


app.use("/api",summaryRoutes);






const PORT = process.env.PORT ;
app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`)
});