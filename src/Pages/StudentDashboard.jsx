import React from "react";
import Nav from "../COMPONENTS/Nav";
import Recruiters from "../COMPONENTS/Recruiters";
const StudentDashboard = () => {
  return <div className="w-full ">
     <div className="boxWidth">
          <Nav role="student" />
          <Recruiters />
        </div>
  </div>;
};

export default StudentDashboard;
