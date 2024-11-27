import React, { useState } from "react";
import * as XLSX from "xlsx"; // Import xlsx library
import axios from "axios"; // Import axios

const PostPlacementProcess = () => {
  const [messageType, setMessageType] = useState(""); // To track selected message type
  const [message, setMessage] = useState(""); // To hold the message input
  const [companyName, setCompanyName] = useState(""); // To hold the company name
  const [roundType, setRoundType] = useState(""); // To hold round type for shortlisted students
  const [studentInfo, setStudentInfo] = useState(""); // To hold manually entered student info
  const [fileData, setFileData] = useState([]); // To hold the parsed Excel data
  const [error, setError] = useState(""); // To hold error message
  const [toastMessage, setToastMessage] = useState(""); // To hold toast message
  const [toastType, setToastType] = useState(""); // To set toast type (success/error)

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      alert("Please upload a valid Excel file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Read the first sheet
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setFileData(sheetData); // Store the parsed data
    };

    reader.readAsBinaryString(file);
  };

  // Handle form submission using axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error
    setError("");

    // Validation
    if (!messageType) {
      setError("Please select the type of message.");
      return;
    }

    if (!companyName) {
      setError("Please enter the company name.");
      return;
    }

    if (messageType === "Information" && !message) {
      setError("Please enter the message.");
      return;
    }

    if (messageType === "Shortlisted students") {
      if (!roundType) {
        setError("Please enter the round type.");
        return;
      }
      if (!studentInfo && fileData.length === 0) {
        setError("Please provide student information or upload a file.");
        return;
      }
    }

    if (messageType === "Selected students") {
      if (!studentInfo && fileData.length === 0) {
        setError("Please provide selected student information or upload a file.");
        return;
      }
    }

    // Collect form data
    const formData = {
      type: messageType,
      companyName: companyName, // Include company name in form data
      message: message || null,
      roundType: roundType || null,
      studentInfo: studentInfo || null,
      fileData: fileData.length ? fileData : null,
    };

    console.log("FormData sent to backend:", formData);

    try {
      const response = await axios.post("http://localhost:3001/placement-process", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle success based on backend response
      if (response.status === 200) {
        setToastMessage("Placement process posted successfully!");
        setToastType("success");
        setTimeout(() => setToastMessage(""), 3000);

        // Reset form fields after submission
        setMessage("");
        setCompanyName("");
        setRoundType("");
        setStudentInfo("");
        setFileData([]);
        setMessageType("");
      } else {
        // Handle unexpected status codes as errors
        throw new Error(response.data.message || "Unknown error occurred.");
      }
    } catch (error) {
      // If the backend responds with an error status, it will be caught here
      setToastMessage(error.response?.data?.message || "Failed to post placement process.");
      setToastType("error");
      setTimeout(() => setToastMessage(""), 3000);
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="sm:w-[500px] mx-auto px-16 py-10 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
          Post Placement Process
        </h2>

        {/* Toast Message */}
        {toastMessage && (
          <div
            className={`fixed top-4 right-4 p-3 rounded shadow-md text-white ${
              toastType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toastMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Message Type Dropdown */}
          <div className="mb-4">
            <label htmlFor="messageType" className="block text-gray-700 font-medium mb-2">
              Type of Message:
            </label>
            <select
              id="messageType"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Information">Information</option>
              <option value="Shortlisted students">Shortlisted Students</option>
              <option value="Selected students">Selected Students</option>
            </select>
          </div>

          {/* Company Name Input */}
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
              Company Name:
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Conditional Fields Based on Message Type */}
          {messageType === "Information" && (
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message:
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter your message here"
              ></textarea>
            </div>
          )}

          {(messageType === "Shortlisted students" || messageType === "Selected students") && (
            <>
              {messageType === "Shortlisted students" && (
                <div className="mb-4">
                  <label htmlFor="roundType" className="block text-gray-700 font-medium mb-2">
                    Round Type:
                  </label>
                  <input
                    id="roundType"
                    type="text"
                    value={roundType}
                    onChange={(e) => setRoundType(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter round type"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Add Students Info:
                </label>
                <textarea
                  value={studentInfo}
                  onChange={(e) => setStudentInfo(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter student details manually (e.g., name and email)"
                ></textarea>
                <p className="text-gray-500 text-sm mt-2">OR</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2"
                  accept=".xlsx, .xls"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary text-white font-bold px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            >
              Post
            </button>
          </div>
        </form>

        {/* Debug: Display Parsed File Data */}
        {fileData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Uploaded Data:</h3>
            <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(fileData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPlacementProcess;
