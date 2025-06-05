import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();  

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "hospital_mgmt", // short and valid name
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occurred while connecting to database:", err);
    });
};
