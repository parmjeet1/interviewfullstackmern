import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 


function EditStudent(){
  
  const [showPassword, setShowPassword] = useState(false);

    return (
        
        <div className="container mt-5">
      <h2 className="text-center">Admin Registration</h2>
      
      <form className="form-inline" >
      <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input type="text" className="form-control" id="text"/>
  </div>

  <div className="form-group">
    <label htmlFor="email">Email address:</label>
    <input type="email" className="form-control" id="email"/>
  </div>
  <div className="form-group position-relative">
  <label htmlFor="pwd">Password:</label>
  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      id="pwd"
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
              
  

<Link to="/login"> <button type="submit" className="btn btn-success">Submit</button>
</Link>
</form>
        </div>
   
        
    )
}

export default EditStudent;