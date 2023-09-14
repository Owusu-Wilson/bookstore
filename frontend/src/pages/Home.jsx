import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("table");

  useEffect(() => {
    setLoading(true);
    console.log("fetchin db");
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        console.log("================Response Here============");
        console.log(response);
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((err) => {
        console.log("================Error Here============");
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setType("table")}
        >
          Table View
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setType("cards")}
        >
          Cards View
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <div className="flex flexx-col bg-sky-500 p-1 rounded-md">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
            <button className="">Add Book</button>
          </div>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : type === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
