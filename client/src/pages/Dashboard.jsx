import React, { useEffect, useState } from "react";
import { fetchAdminDetails, addStudent } from "../utils/api";
import AddStudentForm from "../components/AddStudentForm";
import StudentTable from "../components/StudentTable";
import AdminResetPassword from "../components/AdminRestPassword";
function Dashboard() {
 

  
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const data = await fetchAdminDetails();
        if (data) {
          setAdmin(data);
        } else {
          setError("Failed to fetch admin details.");
        }
      } catch (err) {
        setError(err.message || "Error fetching admin details.");
      }
    };

    getAdmin();
  }, []);

  const handleAddStudent = async (formData) => {
   

    try {
        const response = await addStudent(formData);

        if (response.success) {
            alert("Student added successfully!");
           
            
          
            getStudents();
        } else {
            alert("Student not added ");
        }
    } catch (error) {
       
       console.log(error)
    }
};

const handleProfileUpdate = async (formData) => {
  try {
      const response = await updateAdminProfile(formData);
      
      if (response.success) {
          alert("Profile updated successfully!");

          
          setAdmin((prevAdmin) => ({
              ...prevAdmin,
              profileImage: response.profileImage, 
          }));
      } else {
          alert("Failed to update profile.");
      }
  } catch (error) {
      console.error("Error updating profile:", error);
      
  }
};


  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>

     
      <div className="card p-3 mb-4">
        <h5>Logged-in Admin</h5>

        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}

        {admin ? (
          <>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${admin.profileImage}`}
              alt="Admin Profile"
              className="img-thumbnail"
              width="100"
              height="100"
            />
            <p>
              <strong>Name:</strong> {admin.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {admin.email || "N/A"}
            </p>
            <p>
              <strong>Last Login:</strong> {admin.lastLoggedIn ? new Date(admin.lastLoggedIn).toLocaleString() : "N/A"}
            </p>
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#resetPasswordModal"
            >
              <i className="fas fa-key"></i> Forget Password?
            </button>    
           
                      </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <AdminResetPassword handleProfileUpdate={handleProfileUpdate} />

      <AddStudentForm onStudentAdd={handleAddStudent} />
      <StudentTable/>
    </div>
  );
}

export default Dashboard;
