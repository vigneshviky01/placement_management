import React from "react";
import Nav from "../COMPONENTS/Nav";

const PocDashboard = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="boxWidth">
        <Nav role="poc" />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 overflow-hidden whitespace-nowrap border-r-4 border-gray-800 pr-2 animate-loopedTyping">
            POC Dashboard
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PocDashboard;
