import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 

import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../utils/api";

function Home() {
  const navigate = useNavigate();
const [showPassword, setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      return;
    }
    

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await registerAdmin(formData); 
      console.log("API Response:", response);
      setSuccess("Registration successful!");
  
      setTimeout(() => {
        navigate("/login");
      }, 2000);
  
    } catch (error) {
      setError(error);
    }
};

  return (
    <div className="container">
      <h1 className="text-center">Welcome to Student Management System</h1>
      <p className="text-muted text-center">Manage students efficiently with our system.</p>

      <div className="mt-5">
        <h2 className="text-center">Admin Registration</h2>
        {error && <p className="alert alert-danger">{error}</p>}
        {success && <p className="alert alert-success">{success}</p>}

        <form className="form-inline" onSubmit={handleSubmit}> 
          <div className="form-group mb-3">
            <label htmlFor="name">Name:</label> 
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email address:</label> 
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group position-relative mb-3">
            <label htmlFor="password">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className="form-group position-relative mb-3">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="confirmPassword" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
