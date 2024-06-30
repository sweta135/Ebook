import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      if (response.data.success) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setLoggedInUser(response.data.user);
        toast(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      alert("something went wrong registering");
      console.error(err);
    }
  }

  return (
    <div className="rside">
      <form id="LoginForm" className="form" onSubmit={handleLogin}>
        <h1>Login Page</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="sweta@home"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Login</button>
        <p>
          Don't have an account? <Link to="/register"> Register </Link>
        </p>
        <button>Forget Password?</button>
      </form>
    </div>
  );
}
