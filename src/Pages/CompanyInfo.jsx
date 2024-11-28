import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CompanyInfo = () => {
  const location = useLocation();
  const { companyName } = location.state || {};
  const [companyDetails, setCompanyDetails] = useState({});

  useEffect(() => {
    if (companyName) {
      fetchCompanyDetails(companyName);
    }
  }, [companyName]);

  const fetchCompanyDetails = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3001/CD/${name}`);
      const { _id, __v, ...filteredDetails } = response.data; // Exclude _id and __v
      setCompanyDetails(filteredDetails);
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{companyDetails.Companyname}</h1>
      <table className="w-full sm:w-1/2 mt-4 table-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <tbody className="divide-y divide-gray-200">
          {companyDetails.criteria && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Eligibility Criteria:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.criteria}</td>
            </tr>
          )}
          {companyDetails.currentBacklogs && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Max no of current Backlogs Accepted</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.currentBacklogs}</td>
            </tr>
          )}
          {companyDetails.totalBacklogs && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Max no of total Backlogs Accepted</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.totalBacklogs}</td>
            </tr>
          )}
          {companyDetails.skills && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Skills Required:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.skills}</td>
            </tr>
          )}
          {companyDetails.ctc && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">CTC Offered:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.ctc}</td>
            </tr>
          )}
          {companyDetails.dept && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Open to Depts:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.dept}</td>
            </tr>
          )}
          {companyDetails.date && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Drive Scheduled On:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.date}</td>
            </tr>
          )}
          {companyDetails.bond && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Service Agreement:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.bond}</td>
            </tr>
          )}
          {companyDetails.location && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Locations:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.location}</td>
            </tr>
          )}
          {companyDetails.recruitmentProcess && (
            <tr className="flex justify-between bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="font-semibold text-gray-700 px-4 py-4 leading-relaxed">Recruitment Process:</td>
              <td className="text-gray-600 px-4 py-4 leading-relaxed">{companyDetails.recruitmentProcess}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyInfo;