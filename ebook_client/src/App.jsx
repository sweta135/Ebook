import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./pages/components/header";
import Login from "./pages/login";
import Register from "./pages/register";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./pages/components/navBar";
import Dashboard from "./pages/dashboard";
import AddBookForm from "./pages/components/addBookForm";
import Home from "./pages/Home";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import Book from "./pages/components/book";
import Cart from "./pages/cart";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  const [categories, setCategories] = useState([]);

  const [books, setBooks] = useState([]);

  const [cartItems, setCartItems] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    async function checkForTokenUser() {
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:3000/users/getUserByToken",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log(response.data);
          setLoggedInUser(response.data.user);
        } else {
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (err) {
        alert("check for token user failed");
        console.error(err);
      }
    }

    checkForTokenUser();
  }, []);

  useEffect(() => {
    async function getCartItems() {
      try {
        const response = await axios.get("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setCartItems(response.data.cart);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (Object.keys(loggedInUser).length) {
      getCartItems();
    }
  }, [loggedInUser]);

  return (
    <Router>
      <MainComponent
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        categories={categories}
        setCategories={setCategories}
        books={books}
        setBooks={setBooks}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <ToastContainer />
    </Router>
  );
}

function MainComponent({
  loggedInUser,
  setLoggedInUser,
  categories,
  setCategories,
  books,
  setBooks,
  cartItems,
  setCartItems,
}) {
  const location = useLocation();

  return (
    <div className="container">
      <Header
        loggedInUser={loggedInUser}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <div className="navRest">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <NavBar
              loggedInUser={loggedInUser}
              categories={categories}
              setCategories={setCategories}
              setBooks={setBooks}
            />
          )}
        <Routes className="routes">
          {loggedInUser.isAdmin && (
            <>
              <Route path="/adminDashboard" element={<Dashboard />} />
              <Route
                path="/adminDashboard/addBook"
                element={<AddBookForm categories={categories} />}
              />
              <Route
                path="/adminDashboard/manageBooks"
                element={
                  <Home books={books} setBooks={setBooks} manageBook={true} />
                }
              />
              <Route
                path="/adminDashboard/manageBooks/:bookId"
                element={<AddBookForm categories={categories} />}
              />
            </>
          )}

          {!Object.keys(loggedInUser).length && (
            <>
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={<Login setLoggedInUser={setLoggedInUser} />}
              />
            </>
          )}
          <Route
            path="/"
            element={<Home books={books} setBooks={setBooks} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/:bookId"
            element={
              <Book
                cartItems={cartItems}
                setCartItems={setCartItems}
                loggedInUser={loggedInUser}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
