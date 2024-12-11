import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conn =() => {
    
    mongoose.connect(process.env.DB_URI,{
        dbName: "Agency",
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(`Database connection failed, ${err}`);
    });
};


export default conn;