import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/v1", authRoutes),
app.use("/api/v1", userRoutes)

app.listen(port,()=>{
    console.log(`server is listning at http://localhost:${port}`)
    connectDB();
})