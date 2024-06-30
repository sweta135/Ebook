import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

import booksImage from "/books.jpg";
import { Link } from "react-router-dom";

export default function Home({ books, setBooks, manageBook }) {
  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get("http://localhost:3000/book");

        if (response.data.success) {
          setBooks(response.data.books);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch books");
      }
    }

    getBooks();
  }, [setBooks]);

  console.log(books);

  async function deleteBook(id) {
    try {
      const response = await axios.delete(`http://localhost:3000/book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setBooks(response.data.books);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bolder",
          background: `url(${booksImage})`,
          height: "40vh",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textShadow: "5px 5px 10px black",
        }}
      >
        Discover Best Deals on book at Swera Books
      </div>
      <div className="home">
        <h1>Books</h1>
        <div className="book-list">
          {books.map((book, index) => (
            <div key={index}>
              <Link
                to={manageBook ? "./" : `/${book._id}`}
                style={{ textDecoration: "none", color: "black" }}
                className="book-item"
              >
                <h2>{book.title}</h2>
                <img src={book.image} alt={book.title} className="book-image" />
                <p>
                  <strong>Price:</strong> Rs {book.price}
                </p>
                <p>
                  <strong>Pages:</strong> {book.pages}
                </p>
                <p>
                  <strong>Written By</strong> {book.author.fullname}
                </p>
                <p>
                  <strong>Category</strong> {book.category.genreName}
                </p>
              </Link>
              {manageBook && (
                <>
                  <button onClick={() => deleteBook(book._id)}>
                    delete book
                  </button>
                  <Link to={`./${book._id}`}>edit book</Link>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
