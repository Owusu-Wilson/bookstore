import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/booksModel.js";
import booksRouter from "./routes/booksRoute.js";

import cors from "cors";

const app = express();

// MIDDLEWARES
// Middleware for parsing request body
app.use(express.json());

// Middleware for the books route
app.use("/books", booksRouter);

// Middleware for handling CORS policy

app.use(
  cors({
    origin: "*",
  })
);
// ROUTES

// default route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

// ============================================================

// ========================================================================
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
