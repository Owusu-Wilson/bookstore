import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/booksModel.js";

const app = express();

// MIDDLEWARES
// Middleware for parsing request body
app.use(express.json());

// ROUTES

// default route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

// ============================================================

// CREATE: Route for creating new books
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // creating a single book
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ========================================================================
// READ: Route to get all books books
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// ========================================================================
// READ: Route to get a single book by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ======================================================
// UPDATE: Route to update a book by id
app.put("/books/:id", async (request, response) => {
  try {
    if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ){
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.status(200).send({message :'Book Updated Successfully', data:result})
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// ======================================================
// DELETE: Route to delete a book by id
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result){
        return response.status(404).json({message: "Book Not Found"})
    }
    return response.status(200).json({message: "Book Deleted Successfully"})

    } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
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
