import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 

import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../utils/api";


function Login({ setToken }){
  const [showPassword, setShowPassword]=useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await loginAdmin(formData);
      setSuccess("Login successful!");
     localStorage.setItem("token", response.token);
    localStorage.setItem("adminId", response.adminId);
     setToken(response.token);
     navigate("/dashboard");
    } catch (error) {
      setError(error);
    }
  };

    return (
        
        <div className="container mt-5">
      <h2 className="text-center">Admin Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form className="form-inline" onSubmit={handleSubmit}>
   

  <div class="form-group">
    <label for="email">Email address:</label>
    <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
  </div>
 <div className="form-group position-relative">
  <label htmlFor="pwd">Password:</label>
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
<button type="submit" className="btn btn-success">Login</button>


</form>
        </div>
   
        
    )
}

export default Login;