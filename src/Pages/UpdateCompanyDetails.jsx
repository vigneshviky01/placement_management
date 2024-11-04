import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import InputControl from "../Components/InputControl";

function UpdateCompanyDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { companyName } = location.state || {};
    
    // Initialize all fields to prevent "uncontrolled input" warning
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

    // Fetch company details on component mount
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/CD/${companyName}`, companyDetails);
            alert("Company details updated successfully!");
            navigate("/viewcompanydetails");  // Redirect after successful update
        } catch (error) {
            console.error("Error updating company details:", error);
        }
    };

    return (
        <div className="h-full min-h-screen w-full bg-gray_bg flex justify-center items-center">
            <div className="sm:min-w-[480px] bg-secondary shadow-md p-10 rounded-lg flex flex-col gap-4">
                <h1 className="heading text-3xl font-bold">Update Company Details</h1>

                <InputControl
                    label="Companyname"
                    type="text"
                    name="Companyname"
                    placeholder="Enter the job Companyname"
                    value={companyDetails.Companyname || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="Criteria"
                    type="text"
                    name="criteria"
                    placeholder="Enter criteria"
                    value={companyDetails.criteria || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="CTC"
                    type="Number"
                    name="ctc"
                    placeholder="Enter CTC"
                    value={companyDetails.ctc || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="Department"
                    type="text"
                    name="dept"
                    placeholder="Enter department"
                    value={companyDetails.dept || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="Skills"
                    type="text"
                    name="skills"
                    placeholder="Enter required skills"
                    value={companyDetails.skills || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="Date"
                    type="date"
                    name="date"
                    placeholder="Enter the recruitment date"
                    value={companyDetails.date || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="Recruitment Process"
                    type="text"
                    name="recruitmentProcess"
                    placeholder="Enter recruitment process"
                    value={companyDetails.recruitmentProcess || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="Location"
                    type="text"
                    name="location"
                    placeholder="Enter job location"
                    value={companyDetails.location || ""}
                    onChange={handleChange}
                />
                <InputControl
                    label="Bond"
                    type="text"
                    name="bond"
                    placeholder="Enter bond details"
                    value={companyDetails.bond || ""}
                    onChange={handleChange}
                />

                <div className="footer flex flex-col gap-4">
                    <button
                        onClick={handleUpdate}
                        className="button bg-sm-elements text-primary rounded-md font-bold py-2 px-4 transition duration-100"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateCompanyDetails;
