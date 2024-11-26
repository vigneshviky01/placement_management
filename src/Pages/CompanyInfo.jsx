import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CompanyInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const { companyName } = location.state || {};
    const [companyDetails, setCompanyDetails] = useState({
        Companyname: "",
        criteria: "",
        ctc: "",
        dept: "",
        skills: "",
        date: "",
        recruitmentProcess: "",
        location: "",
        bond: "" // Note: Ensure all properties match case in the database
    });
    useEffect(() => {
        if (companyName) {
            fetchCompanyDetails(companyName);
        }
    }, [companyName]);

    const fetchCompanyDetails = async (name) => {
        try {
            const response = await axios.get(`http://localhost:3001/CD/${name}`);
            setCompanyDetails(response.data); // Fill form fields with fetched data
        } catch (error) {
            console.error("Error fetching company details:", error);
        }
    };





  return (
    <div>

       {/* {companyDetails.Companyname} */}

       <div className="m-100 bg-red-500 h-auto"  >
 
       </div>
    </div>
  )
}

export default CompanyInfo