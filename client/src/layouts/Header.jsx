import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../src/utils/api"; 

function Header(){
  const token = localStorage.getItem("token");
    return (
<>
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Student Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">login</Link>
            </li>
            
            {token ?   <li>
            <button onClick={logout} className="btn btn-danger">
                <i className="fas fa-sign-out-alt"></i> Logout
            </button>
            </li>  :<li></li> }
          </ul>
        </div>
      </div>
    </nav>
</>
    )
}

export default Header;


