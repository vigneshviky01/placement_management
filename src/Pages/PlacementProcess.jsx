import React, { useEffect, useState } from "react";
import axios from "axios";

const PlacementProcesses = () => {
  const [placementProcesses, setPlacementProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch placement processes from backend
  useEffect(() => {
    const fetchPlacementProcesses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/placement-process");
        console.log("API Response:", response.data); // Check the API data
        setPlacementProcesses(response.data.data.reverse());
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch placement processes");
        setLoading(false);
      }
    };

    fetchPlacementProcesses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-2xl font-medium text-gray-700">Loading...</p> {/* Increased font size */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-2xl font-medium text-red-600">{error}</p> {/* Increased font size */}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-6"> {/* Increased header font size */}
        Placement Processes
      </h2>

      {placementProcesses.length === 0 ? (
        <p className="text-xl text-center text-gray-600">No placement processes found.</p> 
      ) : (
        <div className="space-y-6">
          {placementProcesses.map((process) => {
            console.log("Process Data:", process); // Debug log each process
            return (
              <div
                key={process._id}
                className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Display Company Name */}
                <h3 className="text-3xl font-bold text-primary">
                  {process.companyName || "Unknown Company"} {/* Larger font size */}
                </h3>

                {/* Process Specific Message */}
                <div className="mt-4 text-xl text-gray-700"> {/* Larger font size */}
                  {process.type === "Information" && (
                    <p>{process.message || "No additional information provided."}</p>
                  )}

                  {process.type === "Shortlisted students" && process.roundType && (
                    <p>
                      The following students have been{" "}
                      <span className="font-medium">shortlisted</span> for the next round (
                      <span className="italic">{process.roundType || "N/A"}</span>).
                    </p>
                  )}

                  {process.type === "Selected students" && (
                    <p>
                      Congratulations to the following students for being{" "}
                      <span className="font-medium">selected</span> by our company. We will send the offer letters shortly.
                    </p>
                  )}
                </div>

                {/* Display Student Info */}
                {process.studentInfo && process.type !== "Information" && (
                  <div className="mt-4">
                    <ul className="list-disc list-inside text-xl text-gray-700 mt-2">
                      {process.studentInfo
                        .split("\n")
                        .map((info, index) => (
                          <li key={index}>{info.trim()}</li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Display File Data */}
                {process.fileData &&
                Array.isArray(process.fileData) &&
                process.fileData.length > 0 && (
                  <div className="overflow-x-auto mt-4">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          {[
                            "Name",
                            "RollNumber",
                            "Department",
                            "PhoneNumber",
                            "PersonalEmail",
                          ].map((field, index) => (
                            <th
                              key={index}
                              className="border border-gray-300 px-6 py-3 text-left text-xl"
                            >
                              {field} {/* Larger font size */}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {process.fileData.map((student, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            {[
                              "Name",
                              "RollNumber",
                              "Department",
                              "PhoneNumber",
                              "PersonalEmail",
                            ].map((field, i) => (
                              <td
                                key={i}
                                className="border border-gray-300 px-6 py-3 text-xl"
                              >
                                {student[field] || "N/A"} {/* Larger font size */}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlacementProcesses;
