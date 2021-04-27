//USING ES MODULES HERE, SO INSTEAD OF REQUIRE WE USE IMPORT
//MAKE SURE TO USE "type": "module" IN THE ROOT PACKAGE.JSON
//BEFORE THIS WOULD BE : const express = require("express")
//SO INSTEAD OF 'module.exports' WE CAN JUST USE EXPORT DEFAULT
//NOTE THAT IF WE IMPORT A FILE WE NEED TO USE THE .js EXTENSION
import express from "express";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadedFilesRoutes from "./routes/uploadedFilesRoutes.js";

dotenv.config();

connectDB();
const app = express();

//Gives you a log of the endpoints you hit
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//middleware that allows us to accept json data in the body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//routes we get from from the controllers
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadedFilesRoutes);

//ROUTE TO PAYPAL CLIENT_ID
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//Make the 'uploads' folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//error handling middleware imported for middleware
app.use(notFound);
app.use(errorHandler);

//env variable for the PORT where the server is running
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
);
