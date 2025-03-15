import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    setToken(null);
    navigate("/login"); 
  };
  const handleHomeClick = () => {
    if (token) {
     
      navigate("/dashboard");
    } else {
     
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
    <span
  className="navbar-brand"
  role="button"        
  tabIndex="0"         
  onClick={handleHomeClick}
 
  style={{ cursor: 'pointer' }} 
>
  Home
</span>

      <ul className="navbar-nav ms-auto">
        {token ? (
          <>
           
            <li className="nav-item">
              <Link className="nav-link" to="/student">Student Zone</Link>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </li>
          </>
        ) : (
     
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
  );
};

export default Header;
