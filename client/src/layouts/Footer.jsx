import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">© {new Date().getFullYear()} Student Management System. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
