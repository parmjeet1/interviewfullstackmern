import React, { useEffect, useState } from "react";
import { deleteStudent, fetchStudents } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditStudentModal from "./EditStudentModal";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);


  useEffect(() => {
    const getStudents = async () => {
      try {
        const studentData = await fetchStudents();
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const studentData = await fetchStudents();
      setStudents(studentData);
    } catch (error) {
      console.error(" Error fetching students:", error);
    }
  };
  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await deleteStudent(studentId);
      setStudents(students.filter((student) => student._id !== studentId));
      alert("Student deleted successfully!");
    } catch (error) {
      console.error(" Error deleting student:", error);
      
    }
  };

  return (
    <div className="card p-3">
      <h5>Student List</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Qualification</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.gender}</td>
                <td>{student.qualification.join(", ")}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${student.profileImage}`}
                    alt="Profile"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                </td>
                <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setSelectedStudent(student)}
                >
                    <FontAwesomeIcon icon={faPencilAlt} />

                </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default StudentTable;
