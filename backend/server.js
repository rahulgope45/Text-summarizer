import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import summaryRoutes from "./src/routes/summary.route.js"
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { connectRedis, disconnectedRedis } from './src/config/redis.js';

import authRoutes from "./src/routes/auth.route.js"


const app = express();


app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'https://text-summarizer-beryl.vercel.app',
            'https://text-summarizer-git-main-rahulgope45s-projects.vercel.app'
        ];
        
        // Allow all vercel.app domains
        if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(cookieParser());
app.use(passport.initialize()); 
import("./src/config/passport.js"); 

//Frontend


connectDB();
connectRedis();


app.use("/api",summaryRoutes); 

app.use("/api/auth",authRoutes);






const PORT = process.env.PORT ;
app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`)
});


process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing server...')
    await disconnectedRedis();
    server.close(() =>{
        console.log('Server closed')
        process.exit(0)
    }) 
})


export default app;