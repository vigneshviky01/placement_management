import { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import StudentDashboard from "./Pages/StudentDashboard";
import PocDashboard from "./Pages/PocDashboard";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Admin from "./Pages/Admin";
import StudentOrPoc from "./Pages/StudentOrPoc";
import { Route, Routes, Navigate } from "react-router-dom";
import StudentDetails from "./Pages/StudentDetails";

function App() {
  return (
    <main className="w-full overflow-hidden">
      <Routes>
        {/* Redirect from root (/) to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentDetails"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/poc"
          element={
            <ProtectedRoute allowedRoles={['poc']}>
              <PocDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
          <Route
          path="/studentOrPoc"
          element={
           
              <StudentOrPoc />
           
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<Profile info={info} />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
