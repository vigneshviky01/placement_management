import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const StudentDB = () => {
  const [companies, setCompanies] = useState([]);  // To hold the list of companies and their applicants
  const [loading, setLoading] = useState(true);     // To manage loading state
  const [error, setError] = useState("");           // To manage error state

  // Fetch companies and the students who applied
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Fetch all companies and students who applied to them
        const response = await axios.get("http://localhost:3001/get_all_students_applied_to_company");
        const companiesData = response.data;
        setCompanies(companiesData);
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching companies data:", err);
        setError("An error occurred while fetching the companies data.");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch the student details using their email
  const fetchStudentDetails = async (email) => {
    try {
      const response = await axios.post("http://localhost:3001/student", { email });
      return response.data;  // Return student data
    } catch (err) {
      console.error("Error fetching student details:", err);
      return null;  // Return null if error occurs
    }
  };

  // Function to export data to Excel
  const exportToExcel = (companyName, studentsEmails) => {
    const allData = [];

    // Loop through all students who applied to the current company
    studentsEmails.forEach(email => {
      fetchStudentDetails(email).then(student => {
        if (student) {
          allData.push({
            Name: student.Name || 'N/A',
            RollNumber: student.RollNumber || 'N/A',
            Department: student.Department || 'N/A',
            PhoneNumber: student.PhoneNumber || 'N/A',
            PersonalEmail: student.PersonalEmail || 'N/A',
            TenthMark: student.TenthMark || 'N/A',
            TwelfthMark: student.TwelfthMark || 'N/A',
            CurrentSemester: student.CurrentSemester || 'N/A',
            CGPA: student.CGPA || 'N/A',
            Gender: student.Gender || 'N/A',
            YearOfPassing: student.YearOfPassing || 'N/A',
            Resume: student.Resume || 'N/A',
            Role: student.Role || 'N/A'
          });
        }
      });
    });

    // Wait for all data to be fetched
    setTimeout(() => {
      const ws = XLSX.utils.json_to_sheet(allData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `${companyName} Students`);

      // Export to Excel
      const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([excelFile], { type: "application/octet-stream" }), `${companyName}_students_data.xlsx`);
    }, 1000); // Wait for a second for the data to populate
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Students Applied to Companies
      </h1>

      {/* Show loading state */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Show error message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Render the companies and the students who applied */}
 {/* Render the companies and the students who applied */}
{/* Render the companies and the students who applied */}
{companies.map((company) => (
  <div key={company._id} className="mb-8">
    {/* Check if students have applied */}
    {company.StudentsEmail.length > 0 ? (
      <>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company: {company.CompanyName}</h2>

        {/* Button to download students data for each company */}
        <button
          onClick={() => exportToExcel(company.CompanyName, company.StudentsEmail)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md mb-6 mx-auto block"
        >
          Download {company.CompanyName} Students as Excel
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Name</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Roll Number</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Department</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Phone Number</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Personal Email</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Tenth Mark</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Twelfth Mark</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Current Semester</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">CGPA</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Gender</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Year Of Passing</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Resume</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {company.StudentsEmail.map((email, index) => (
                <StudentDetailsRow
                  key={index}
                  email={email}
                  fetchStudentDetails={fetchStudentDetails}
                />
              ))}
            </tbody>
          </table>
        </div>
      </>
    ) : (
      // Message for companies with no applicants
      <p className="text-center text-gray-500">
        No one applied yet for {company.CompanyName}.
      </p>
    )}
  </div>
))}



    </div>
  );
};

// Component to render each student's details in a table row
const StudentDetailsRow = ({ email, fetchStudentDetails }) => {
  const [student, setStudent] = useState(null);  // To store student details
  const [loading, setLoading] = useState(true);  // To manage loading state

  useEffect(() => {
    const getStudentDetails = async () => {
      const studentDetails = await fetchStudentDetails(email);
      if (studentDetails) {
        setStudent(studentDetails);
      }
      setLoading(false);  // Set loading to false after fetching student details
    };

    getStudentDetails();
  }, [email, fetchStudentDetails]);

  if (loading) {
    return (
      <tr>
        <td colSpan="13" className="text-center py-3 px-6 text-gray-500">Loading...</td>
      </tr>
    );
  }

  if (!student) {
    return (
      <tr>
        <td colSpan="13" className="text-center py-3 px-6 text-red-500">Student details not found</td>
      </tr>
    );
  }
  console.log(student)

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-6 text-gray-700">{student.Name}</td>
      <td className="py-3 px-6 text-gray-700">{student.RollNumber || "N/A"}</td>
      <td className="py-3 px-6 text-gray-700">{student.Department || "N/A"}</td>
      <td className="py-3 px-6 text-gray-700">{student.PhoneNumber}</td>
      <td className="py-3 px-6 text-gray-700">{student.PersonalEmail || "N/A"}</td>
      <td className="py-3 px-6 text-gray-700">{student.TenthMark || "N/A"}</td>
      <td className="py-3 px-6 text-gray-700">{student.TwelfthMark || "N/A"}</td>
       <td className="py-3 px-6 text-gray-700">{student.CurrentSememseter}</td> {/*this is wrong -semester  */}
      <td className="py-3 px-6 text-gray-700">{student.CGPA}</td>
      <td className="py-3 px-6 text-gray-700">{student.Gender}</td>
      <td className="py-3 px-6 text-gray-700">{student.YearOfPassing}</td>
      <td className="py-3 px-6 text-gray-700">{student.Resume}</td>
      <td className="py-3 px-6 text-gray-700">{student.Role}</td>
    </tr>
  );
};

export default StudentDB;
