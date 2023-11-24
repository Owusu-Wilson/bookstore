import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const BACKEND_URL = "https://bookstore-backend-9baw.onrender.com/books"
const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${BACKEND_URL}/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("An Error has occurred, please try again");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2>{id}</h2>
          <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
            <h3 className="text-2xl">
              Are You Sure You want to Delete this book?
            </h3>
            <button
              className="p-4 bg-red-600 text-white m-8 w-full"
              onClick={handleDeleteBook}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteBook;
