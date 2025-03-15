import React, { useState } from "react";

const AddStudentForm = ({ onStudentAdd }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: [], 
    gender: "",
    password: "",
    profileImage: null,
  });


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setStudent((prev) => ({
        ...prev,
        qualification: checked
          ? [...prev.qualification, value] 
          : prev.qualification.filter((q) => q !== value), 
      }));
    } else if (type === "file") {
      setStudent({ ...student, profileImage: files[0] }); 
    } else {
      setStudent({ ...student, [name]: value }); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
   const formData = new FormData();
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("password", student.password);
    formData.append("phone", student.phone);
    formData.append("gender", student.gender);
  
        formData.append("qualification", student.qualification.join(","));

    if (student.profileImage) {
      formData.append("profileImage", student.profileImage); 
    }
  await onStudentAdd(formData);
     

    
  

    setStudent({
      name: "",
      email: "",
      phone: "",
      qualification: [],
      gender: "",
      password: "",
      profileImage: null,
    });

  } catch (error) {
    console.error("Error adding student:", error);
  }
  };
  
  return (
    <div className="card p-3 mb-4">
      <h5>Add Student</h5>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
     
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
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
            value={student.email}
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
            value={student.phone}
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
                  checked={student.qualification.includes(qual)}
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
            value={student.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={student.password}
            onChange={handleChange}
            required
          />
        </div>

       
        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

       
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
