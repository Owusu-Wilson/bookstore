import express  from "express";
import { Book } from "../models/Model.js";
const booksRouter = express.Router()


// CREATE: Route for creating new books
booksRouter.post("/", async (request, response) => {
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
booksRouter.get("/", async (request, response) => {
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
booksRouter.get("/:id", async (request, response) => {
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
booksRouter.put("/:id", async (request, response) => {
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
booksRouter.delete("/:id", async (request, response) => {
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


export default booksRouter;