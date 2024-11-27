import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const email = localStorage.getItem("email"); // Retrieve email from localStorage
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: "",
    Name: "",
    RollNumber: "",
    Department: "",
    PhoneNumber: "",
    PersonalEmail: "",
    TenthMark: "",
    TwelfthMark: "",
    CurrentSememseter: "",
    CGPA: "",
    Gender: "",
    YearOfPassing: "",
    Resume: "",
    Role: "", // This will not be displayed or editable
  });

  const [isEditable, setIsEditable] = useState(false); // State to toggle between view and edit modes

  const [showToaster, setShowToaster] = useState({ show: false, message: "", type: "" }); // To show toaster as object

  // Fetch personal data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/student", {
          email,
        });
        const { _id, __v, Role, ...filteredData } = response.data; // Exclude _id, __v, and Role
        setFormData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [email]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting
    try {
      await axios.patch("http://localhost:3001/student/update", {
        email,
        ...formData,
      });
      setShowToaster({
        show: true,
        message: "Personal details updated successfully!",
        type: "success",
      });

      setTimeout(() => {
        setShowToaster({ show: false, message: "", type: "" });
      }, 3000); // Hide toaster after 3 seconds

      setIsEditable(false); // Set back to read-only mode
      navigate("/student"); // Redirect to another page
    } catch (error) {
      setShowToaster({
        show: true,
        message: "Error updating details. Please try again.",
        type: "error",
      });
      setTimeout(() => {
        setShowToaster({ show: false, message: "", type: "" });
      }, 3000); // Hide toaster after 3 seconds
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h1 className="text-2xl font-bold mb-6">MY PROFILE</h1>

        {/* Edit Button in the Top Right */}
        {!isEditable && (
          <button
            onClick={() => setIsEditable(true)} // Enable edit mode
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        )}

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Email Field (Always Read-Only) */}
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="text"
              name="Email"
              value={formData.Email}
              disabled
              className="w-full p-2 text-gray-700 leading-tight bg-gray-200 cursor-not-allowed border-none focus:outline-none focus:ring-2 focus:ring-dashed"
            />
          </div>

          {/* Editable Fields in Two Columns */}
          {Object.keys(formData)
            .filter((key) => key !== "Email" && key !== "Role") // Exclude Email and Role from editable fields
            .map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  disabled={!isEditable} // Disable if not in edit mode
                  className={`w-full p-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-dashed ${
                    isEditable ? "bg-transparent border-b-2 focus:border-gray-600" : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            ))}

          {/* Save and Cancel Buttons (Visible Only in Edit Mode) */}
          {isEditable && (
            <div className="col-span-2 flex justify-between mt-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditable(false)} // Cancel editing
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Toaster Notification */}
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

export default EditProfile;
