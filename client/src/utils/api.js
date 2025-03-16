import axios from "axios";


const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const registerAdmin = async (formData) => {
    try {
        
      const response = await axios.post(`${apiUrl}/auth/register`, formData);
      return response.success;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed!";
    }
  };
  export const loginAdmin = async (formData) => {
    try {
      
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      return { success: true, token: response.data.token, adminId: response.data.adminId };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed!" };
    }
  };

  export const fetchAdminDetails = async () => {
    try {
        const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found! Please login again.");
      }
  
      const response = await axios.get(`${apiUrl}/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data.admin;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch admin details.");
    }
  };
  export const addStudent = async (studentData) => {
    try {
        const token = localStorage.getItem("token");
        const adminId = localStorage.getItem("adminId");
        if (!token) {
            throw new Error("No token found! Please login again.");
        }
        studentData.append("createdBy", adminId);
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/students/add`,
            studentData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Failed to add student.");
    }
};

export const fetchStudents = async () => {
    try {
        const token = localStorage.getItem("token");
       
        if (!token) {
            throw new Error("No token found! Please login again.");
        }

        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/students/all`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.students;
    } catch (error) {
        console.error(" API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch students.");
    }
};

export const deleteStudent = async (studentId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found! Please login again.");
        }

        const response = await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/students/delete/${studentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(" API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to delete student.");
    }
};
export const updateStudent = async (studentId, studentData) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          throw new Error("No token found! Please login again.");
      }

      const formData = new FormData();
      formData.append("name", studentData.name);
      formData.append("email", studentData.email);
      formData.append("phone", studentData.phone);
      formData.append("gender", studentData.gender);
      if (Array.isArray(studentData.qualification)) {
          studentData.qualification.forEach((q) => formData.append("qualification", q));
      } else if (typeof studentData.qualification === "string") {
          formData.append("qualification", studentData.qualification);
      }
     const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/students/update/${studentId}`,
          formData,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );

      return response.data;
  } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to update student.");
  }
};

export const updateAdminProfile = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found! Please login again.");
      }
  
      const adminId = localStorage.getItem("adminId");
      formData.append("adminId", adminId);
  
      const response = await axios.put(
        `${apiUrl}/admin/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
   
  
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update profile.");
    }
  };
  

export const logout = () => {
  localStorage.removeItem("token");  
  localStorage.removeItem("adminId");
  window.location.href = "/login";  
};
  
  