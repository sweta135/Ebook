import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return alert("input fields cannot be empty");
    }

    if (password !== confirmPassword) {
      return alert("password doesnt match");
    }

    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast(response.data.message);
        navigate("/login");
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
      <form id="registerForm" className="form" onSubmit={handleRegister}>
        <h1>Register Page</h1>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Sweta Lama"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
