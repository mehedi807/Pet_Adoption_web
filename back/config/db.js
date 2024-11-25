import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error");
        process.exit(1);
    }
}