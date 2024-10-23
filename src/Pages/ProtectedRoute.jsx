import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure you are importing the default export
import axios from "axios";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = jwtDecode(token); // Decode the token
    setDecodedToken(decoded); // Store decoded token in state

    // Immediately navigate if the user doesn't have the right role
    if (!allowedRoles.includes(decoded.role)) {
      if (decoded.role === "student") {
        navigate('/student');
      } else if (decoded.role === "poc") {
        navigate('/studentOrPoc');
      } else if (decoded.role === "admin") {
        navigate('/admin');
      } else {
        navigate('/login');
      }
      return; // Exit the effect if we navigate
    }

    // Only fetch student data if the role is 'student'
    if (decoded.role === "student") {
      const fetchStudentData = async (email) => {
        try {
          const res = await axios.post('http://localhost:3001/student', { email });
          const studentData = res.data;

          // Check if any required fields are empty or null
          const isIncomplete =
            !studentData.CGPA ||
            !studentData.CurrentSememseter ||
            !studentData.Department ||
            !studentData.Email ||
            !studentData.Gender ||
            !studentData.Name ||
            !studentData.PersonalEmail ||
            !studentData.PhoneNumber ||
            !studentData.Resume ||
            !studentData.RollNumber ||
            !studentData.TenthMark ||
            !studentData.TwelfthMark ||
            !studentData.YearOfPassing;

          // Navigate to StudentDetail if any field is incomplete
          if (isIncomplete) {
            navigate('/studentDetails'); // Update with your actual route for student details
            return; // Exit the function
          }

        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudentData(decoded.email); // Fetch student data
    }

  }, [navigate, allowedRoles]); // Add dependencies

  return children; // Render the protected component if role is valid
};

export default ProtectedRoute;
