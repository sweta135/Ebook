import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Book({ cartItems, setCartItems, loggedInUser }) {
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function getBook() {
      try {
        const response = await axios.get(
          `http://localhost:3000/book/${bookId}`
        );

        if (response.data.success) {
          setBook(response.data.book);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch book");
      }
    }

    getBook();
  }, []);

  console.log(book);

  const {
    title,
    author,
    category,
    description,
    image,
    pages,
    price,
    quantity,
  } = book;

  async function addToCart() {
    try {
      const response = await axios.post(
        `http://localhost:3000/cart`,
        {
          book,
          cartCount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast(response.data.message);
        setCartItems(response.data.cart);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch book");
    }
  }

  return (
    Object.keys(book).length && (
      <div style={styles.container}>
        <h2 style={styles.title}>Book Details</h2>
        <div style={styles.bookContainer}>
          <div style={styles.imageContainer}>
            <img src={image} alt={title} style={styles.image} />
          </div>
          <div style={styles.detailsContainer}>
            <p>
              <strong>Title:</strong> {title}
            </p>
            <p>
              <strong>Author:</strong> {author.fullname}
            </p>
            <p>
              <strong>Category:</strong> {category.genreName}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Pages:</strong> {pages}
            </p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
          </div>
        </div>
        {loggedInUser && !loggedInUser.isAdmin && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() =>
                  cartCount === 0 ? " " : setCartCount(cartCount - 1)
                }
              >
                -
              </button>
              <div>{cartCount}</div>
              <button
                onClick={() =>
                  cartCount === quantity ? "" : setCartCount(cartCount + 1)
                }
              >
                +
              </button>
            </div>
            {cartCount === quantity && <div>out of stock</div>}
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        )}
      </div>
    )
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  bookContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  },
  imageContainer: {
    marginRight: "20px",
  },
  image: {
    width: "250px",
    height: "350px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  detailsContainer: {
    maxWidth: "600px",
    textAlign: "left",
  },
};
