import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token, redirect to login
      navigate('/login');
      return;
    }

    try {
      // Verify the token
      const decoded = jwtDecode(token);
      console.log(decoded);

      // Check if the user's role is one of the allowed roles
      if (!allowedRoles.includes(decoded.role)) {
        // If the role is not allowed, redirect based on their role
        if (decoded.role === "student") {
          navigate('/student'); // Redirect student to the student dashboard
        } else if (decoded.role === "poc") {
          navigate('/studentOrPoc'); // Redirect POC to POC dashboard
        } else if (decoded.role === "admin") {
          navigate('/admin'); // Redirect admin to admin dashboard
        } else {
          // If the role is unknown, send to login
          navigate('/login');
        }
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      navigate('/login'); // Redirect to login on error
    }
  }, [navigate, allowedRoles]);

  return children; // Render the protected component if the role is allowed
};

export default ProtectedRoute;
