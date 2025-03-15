import React, { useState } from "react";
import {updateAdminProfile} from "../utils/api"
const AdminResetPassword =  ({ handleProfileUpdate }) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        profileImage: null,
      });
    
      const [passwordMatch, setPasswordMatch] = useState(true);
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    

      const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === "profileImage") {
          setFormData({ ...formData, profileImage: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
    
       
        if (name === "confirmPassword") {
          setPasswordMatch(value === formData.newPassword);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
    
        if (!passwordMatch) {
            setErrorMessage("Passwords do not match!");
            return;
        }
    
        try {

            const submitFormData = new FormData();
            submitFormData.append("oldPassword", formData.oldPassword);
            submitFormData.append("newPassword", formData.newPassword);
    
            const adminId = localStorage.getItem("adminId");
            submitFormData.append("adminId", adminId);
    
            
            if (formData.profileImage) {
              submitFormData.append("profileImage", formData.profileImage);
            }
                const response = await updateAdminProfile(submitFormData);
    
            if (response.success) {
                setSuccessMessage("Profile updated successfully!");
    
                handleProfileUpdate({
                    profileImage: response.profileImage,
                });
                setTimeout(() => {
                    document.querySelector("#resetPasswordModal .btn-close").click();
                }, 1000);
                

    

                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                    profileImage: null,
                });
    

                
            } else {
                setErrorMessage("Failed to update profile.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    
    
  return (
    <div className="modal fade" id="resetPasswordModal" tabIndex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
        
          <div className="modal-header">
            <h5 className="modal-title" id="resetPasswordModalLabel">Reset Password & Update Profile</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          
          <div className="modal-body">
          {successMessage && <p className="text-success">{successMessage}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
          
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

            
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${passwordMatch ? "" : "is-invalid"}`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {!passwordMatch && <div className="text-danger">Passwords do not match!</div>}
              </div>

             
              <div className="mb-3">
                <label className="form-label">Update Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>


              <button type="submit" className="btn btn-primary" disabled={!passwordMatch}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResetPassword;
