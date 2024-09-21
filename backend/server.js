// const express = require("express")
import express from "express";
import dotenv from "dotenv";
//routes
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());   //allows us to use req.body

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//authentication 
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server is runing on http://localhost:"+ PORT);

    connectDB();
});

//mDJpwksHqad5FY0m