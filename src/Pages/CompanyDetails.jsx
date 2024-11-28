import React, { useState, useEffect } from 'react';
import CDetails from '../COMPONENTS/cDetails';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CompanyDetails() {
    const [companyList, setCompanyList] = useState([]);
    const navigate = useNavigate();

    // Fetch company data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/CD");
                if (res.data === "No companies found") {
                    console.log("No company");
                } else {
                    setCompanyList(res.data); // Update company list with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Delete company function
    async function deletecompany(companyName) {
        try {
            const response = await axios.delete(`http://localhost:3001/CD/${companyName}`);
            console.log(response.data.message);

            // Update the company list by filtering out the deleted company
            setCompanyList(prevList => prevList.filter(company => company.Companyname !== companyName));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Company not found');
            } else {
                console.log('An error occurred while deleting the company:', error.message || error);
            }
        }
    }

    // Function to navigate to update page
    function updatecompany(companyName) {
        navigate(`/updatecompanydetails`, { state: { companyName } });
    }

    function CompanyInformation(companyName) {
        navigate(`/companyinfo`, { state: { companyName } });
    }

    // Generate list of company details
    const company_list = companyList.map((company, index) => (
        <CDetails
            key={index}
            Sno={index + 1}
            name={company.Companyname}
            criteria={company.criteria}
            date={company.date}
            info={() => CompanyInformation(company.Companyname)}
            deletec={() => deletecompany(company.Companyname)}
            updatec={() => updatecompany(company.Companyname)}
        />
    ));

    // Function to navigate to add company page
    function Addcompany() {
        navigate("/addcompanydetails");
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="companydetails-header flex justify-between items-center mb-6">
                <div className="text-xl font-bold text-gray-800">COMPANY DETAILS</div>
                <img
                    src="/icons8-plus-30.png"
                    alt="Add"
                    width={50}
                    className="cursor-pointer hover:opacity-75"
                    onClick={Addcompany}
                />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                {companyList.length === 0 ? (
                    <p className="text-center text-gray-500">No companies available.</p>
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">S.No</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Company Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Criteria</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {company_list}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default CompanyDetails;