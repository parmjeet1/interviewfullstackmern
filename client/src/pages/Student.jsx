import React, { useEffect, useState } from "react";  // Import useState here
import AddStudentForm from "../components/AddStudentForm";
import StudentTable from "../components/StudentTable";
import { addStudent, fetchStudents } from "../utils/api";

function Student() {
    const [students, setStudents] = useState([]);
    const getStudents = async () => {
        try {
          const studentData = await fetchStudents();
          
          setStudents(studentData);  
          
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };

      useEffect(() => {
        getStudents();  
      }, []);
  const handleAddStudent = async (formData) => {
    try {
      const response = await addStudent(formData);
      if (response.success) {
        alert("Student added successfully!");
        setStudents((prevStudents) => [
          ...prevStudents,
          response.student, 
        ]);
      } else {
        alert("Student not added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="container mt-5">
      <h2 className="text-center">Student Management</h2>
      <StudentTable students={students} setStudents={setStudents} />
     <br/>
      <AddStudentForm onStudentAdd={handleAddStudent} />
    </div>
  );
}

export default Student;
