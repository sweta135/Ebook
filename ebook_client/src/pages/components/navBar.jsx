import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NavBar({
  loggedInUser,
  categories,
  setCategories,
  setBooks,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("http://localhost:3000/categories");

        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getCategories();
  }, []);

  async function getSelecetedCategory(id) {
    try {
      const response = await axios.get(
        `http://localhost:3000/categories/${id}`
      );

      if (response.data.success) {
        setBooks(response.data.books);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log(categories);

  return (
    <aside className="nav">
      <nav>
        {loggedInUser.isAdmin && <Link to="/adminDashboard">Dashboard</Link>}
        <div>
          <h3>Categories</h3>
          <div>
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  onClick={() => getSelecetedCategory(category._id)}
                >
                  {category.genreName}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
