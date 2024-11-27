import React, { useState, useEffect } from "react";
import Nav from "../COMPONENTS/Nav";
import axios from "axios";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({});
  const [toaster, setToaster] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const email = localStorage.getItem("email");

        if (!email) {
          setLoading(false);
          return;
        }

        const response = await axios.post("http://localhost:3001/companies_by_student", { email });
        setApplications(response.data.companies || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchCompanyDetails = async (companyName) => {
      try {
        const response = await axios.get(`http://localhost:3001/CD/${companyName}`);
        setCompanyDetails((prevState) => ({
          ...prevState,
          [companyName]: response.data,
        }));
      } catch (err) {}
    };

    applications.forEach((application) => {
      fetchCompanyDetails(application);
    });
  }, [applications]);

  const handleRemoveApplication = async (companyName) => {
    try {
      const email = localStorage.getItem("email");

      if (!email) {
        setToaster({ show: true, message: "Email not found in localStorage.", type: "error" });
        return;
      }

      const response = await axios.delete("http://localhost:3001/removeApplication", {
        data: { email, companyName },
      });

      if (response.status === 200) {
        setToaster({ show: true, message: "Application removed successfully!", type: "success" });
        setApplications((prev) => prev.filter((application) => application !== companyName));
      } else {
        setToaster({ show: true, message: "Failed to remove application.", type: "error" });
      }
    } catch (err) {
      setToaster({ show: true, message: "Error removing application.", type: "error" });
    } finally {
      setTimeout(() => setToaster({ show: false, message: "", type: "" }), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="boxWidth">
        <Nav role="student" />
      </div>
      <div className="px-6 py-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Applications</h1>

        {applications.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 px-4">
            {applications.map((application, index) => {
              const company = companyDetails[application];
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow p-6 border-t-4 border-primary"
                >
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold py-1 px-2 rounded-lg">
                    Applied
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-2">{company?.Companyname || application}</h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Role:</span> {company?.role || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span> {company?.location || "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">Date Applied:</span> {company?.date || "N/A"}
                  </p>
                  <button
                    onClick={() => handleRemoveApplication(company.Companyname)}
                    className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all"
                  >
                    Remove Application
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">You have not applied to any companies yet.</p>
        )}
      </div>

      {toaster.show && (
        <div
          className={`fixed top-4 right-4 py-2 px-4 rounded-md shadow-lg ${
            toaster.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toaster.message}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
