import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute"; 
import Student from "./pages/Student";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token")); 
  }, []); 

  return (
    <Router>
   <Header token={token} setToken={setToken} />
   <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/student" element={<Student />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
