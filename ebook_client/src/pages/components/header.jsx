import { Link } from "react-router-dom";

export default function Header({ loggedInUser, cartItems }) {
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <header>
      <div>
        <img src="/Swera.png" alt="Logo" srcSet="" />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      {Object.keys(loggedInUser).length ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Welcome {loggedInUser.fullname} {loggedInUser.isAdmin && "(Admin)"}
          <img
            src="/profile.jpg"
            className="profileImg"
            alt=""
            style={{
              borderRadius: "100%",
              marginLeft: "10px",
            }}
          />
          {!loggedInUser.isAdmin && (
            <Link to="/cart">
              <img
                src="/cart.png"
                alt=""
                style={{
                  height: "50px",
                  marginLeft: "10px",
                }}
              />
              {cartItems.length}
            </Link>
          )}
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <Link to="/login" id="login">
          Login
        </Link>
      )}
    </header>
  );
}
