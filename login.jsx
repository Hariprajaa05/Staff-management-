import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ user_id: "", password: "" });
  const [errors, setErrors] = useState({ user_id: false, password: false });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let newErrors = {
      user_id: formData.user_id.trim() === "",
      password: formData.password.trim() === "",
    };
    setErrors(newErrors);
  
    if (!newErrors.user_id && !newErrors.password) {
      try {
        const response = await axios.post("http://localhost:5000/login", formData);
  
        if (response.data.success) {
          setMessage("Login successful!");
  
          const { designation, redirectPage, user } = response.data;
  
          // Store user data in sessionStorage
          sessionStorage.setItem("user", JSON.stringify(user));
  
          console.log("Navigating to:", designation === "JA" ? "/japage" : `/${redirectPage || "dashboard"}`);
  
          if (designation === "JA") {
            navigate("/japage");
          } else {
            navigate(`/${redirectPage || "dashboard"}`);
          }
        } else {
          setMessage("Invalid User ID or Password.");
        }
      } catch (error) {
        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Server error, please try again later.");
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              <FaUser /> User ID
            </label>
            <input
              type="number"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className={errors.user_id ? "error-input" : ""}
              placeholder="Enter your User ID"
            />
            {errors.user_id && <p className="error-text">User ID is required</p>}
          </div>

          <div className="input-group">
            <label>
              <FaLock /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-text">Password is required</p>}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
