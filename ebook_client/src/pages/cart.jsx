import axios from "axios";
import { toast } from "react-toastify";

export default function Cart({ cartItems, setCartItems }) {
  console.log(cartItems);

  async function cartDelete(item) {
    console.log(item);
    try {
      const response = await axios.delete(
        `http://localhost:3000/cart/${item._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cart);
        toast(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete cart");
    }
  }

  return cartItems.length ? (
    <div
      style={{
        width: "100%",
      }}
    >
      <h2 style={{ textAlign: "center" }}>CartItems</h2>
      {cartItems.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: "wheat",
              padding: "10px",
              margin: "5px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <strong>Book Name: </strong>
              {item.bookName}
            </div>
            <div>
              <strong>Quantity: </strong>
              {item.quantity}
            </div>
            <div>
              <strong>Total Price: </strong>
              Rs {item.price}
            </div>
            <button
              style={{
                fontWeight: "bold",
                backgroundColor: "red",
              }}
              onClick={() => cartDelete(item)}
            >
              delete
            </button>
          </div>
        );
      })}
      <div>
        <strong>
          Total Price:{" "}
          <span>
            Rs{" "}
            {cartItems.reduce((total, item) => total + parseInt(item.price), 0)}
          </span>
        </strong>
      </div>
    </div>
  ) : (
    <div>No items on your cart</div>
  );
}
