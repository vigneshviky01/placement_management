import React, { useState } from "react";
import axios from "axios";

const CompanyCard = ({
  Companyname,
  criteria,
  ctc,
  dept,
  skills,
  date,
  recruitmentProcess,
  location,
  bond,
}) => {
  const [showToaster, setShowToaster] = useState({ show: false, message: "", type: "" });

  const postData = async (companyName) => {
    const email = localStorage.getItem("email"); // Ensure email is set in localStorage
    try {
      const res = await axios.post("http://localhost:3001/add_student_to_company", {
        companyName, // Use the same key as the backend expects
        email,
      });
      // Show success toaster
      setShowToaster({
        show: true,
        message: res.data.message || "Applied successfully!",
        type: "success",
      });
    } catch (error) {
      // Show error toaster
      setShowToaster({
        show: true,
        message: error.response?.data.message || "An error occurred.",
        type: "error",
      });
    } finally {
      // Hide toaster after 3 seconds
      setTimeout(() => {
        setShowToaster({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 border-2 shadow-md px-10 py-5 sm:w-[600px]">
      <h2 className="font-bold text-md text-center">{Companyname}</h2>
      <div className="flex flex-col items-start gap-2">
        <div className="flex gap-3">
          <p className="font-semibold">Eligibility Criteria: </p>
          <p>{criteria}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Skills Required: </p>
          <p>{skills}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">CTC Offered: </p>
          <p>{ctc}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Open to Depts: </p>
          <p>{dept}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Drive scheduled on: </p>
          <p>{date}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Service Agreement: </p>
          <p>{bond}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Locations: </p>
          <p>{location}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Recruitment Process: </p>
          <p>{recruitmentProcess}</p>
        </div>
      </div>
      <div
        className="bg-gray-400 text-white px-3 py-2 rounded-md font-semibold tracking-wide cursor-pointer"
        onClick={() => {
          postData(Companyname);
        }}
      >
        Apply
      </div>

      {/* Toaster */}
      {showToaster.show && (
        <div
          className={`fixed top-4 right-4 py-2 px-4 rounded-md shadow-lg ${
            showToaster.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {showToaster.message}
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
