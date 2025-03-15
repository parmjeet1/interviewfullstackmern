import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const checkAuthentication = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = checkAuthentication();
    if (!authenticated) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; 
  }

  return children; 
};

export default ProtectedRoute;
