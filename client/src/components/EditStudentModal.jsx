import React, { useState, useEffect } from "react";
import { updateStudent } from "../utils/api";

const EditStudentModal = ({ student, onClose,onUpdateStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: [],
    gender: "",
    
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        qualification: Array.isArray(student.qualification)
          ? student.qualification
          : [],
        gender: student.gender,
        
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        let updatedQualifications = [...prev.qualification];

        if (checked) {
          updatedQualifications.push(value);
        } else {
          updatedQualifications = updatedQualifications.filter(
            (q) => q !== value
          );
        }

        return { ...prev, qualification: updatedQualifications };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await updateStudent(student._id, formData);

        
        if (response.success) {
            alert("Student updated successfully!");
            onUpdateStudent(response.student);
            onClose(); 
        } else {
            alert("Failed to update student.");
        }
    } catch (error) {
        console.error("Error updating student:", error);
    }
};


  
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Student</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Qualification</label>
                <div>
                  {["B.Sc", "M.Sc", "PhD"].map((qual) => (
                    <label key={qual} className="me-3">
                      <input
                        type="checkbox"
                        name="qualification"
                        value={qual}
                        checked={formData.qualification.includes(qual)}
                        onChange={handleChange}
                      />{" "}
                      {qual}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              

              <button type="submit" className="btn btn-primary">
                Update Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;
