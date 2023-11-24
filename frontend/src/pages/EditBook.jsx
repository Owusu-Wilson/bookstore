import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = "https://bookstore-backend-9baw.onrender.com/books"
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/${id}`)
      .then((res) => {
        console.log("Success on retrieving book");
        console.log(res.data);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An Error occurred");
        console.log(err);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error occurred. Please check the console");
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            placeholder="Author name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            placeholder="book was published on ..."
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>

        <div className="my-4">
          <button className="p-2 bg-sky-300 w-full" onClick={handleEditBook}>
            Save Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
