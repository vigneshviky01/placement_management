import React, { useState, useEffect } from "react";
import CompanyCard from "../COMPONENTS/CompanyCard";
import axios from "axios";

const StudentViewCompanies = () => {
  const [companyList, setCompanyList] = useState([]);
  const [studentData, setStudentData] = useState({});
  const email = localStorage.getItem("email");

  // Fetch company data and student data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyRes = await axios.get("http://localhost:3001/CD");
        if (companyRes.data === "No companies found") {
          console.log("No company found");
        } else {
          setCompanyList(companyRes.data); // Update company list
        }

        const studentRes = await axios.post("http://localhost:3001/student", {
          email,
        });
        const { _id, __v, Role, ...filteredData } = studentRes.data; // Exclude unnecessary fields
        setStudentData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="flex flex-col w-full gap-8 mb-5">
      <h2 className="text-xl font-semibold font-mono py-6 pl-4">List Of Companies in Line:</h2>
      <div className="flex flex-col items-center gap-7">
        {companyList.map((company, key) => (
          <CompanyCard
            key={key}
            {...company}
            studentData={studentData}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentViewCompanies;
