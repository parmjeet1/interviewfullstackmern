import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <main className="container mt-4">
        <Routes>
        {/* <Route path="/" element={ <Home />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/dashboard" element={<Dashboard />}/> */}

         
             <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Home />} />
          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
