import { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import StudentDashboard from "./Pages/StudentDashboard";
import PocDashboard from "./Pages/PocDashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="w-full overflow-hidden">
      
      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/poc" element={<PocDashboard />} />
       
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<Profile info={info} />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </main>
  );
}

export default App;
