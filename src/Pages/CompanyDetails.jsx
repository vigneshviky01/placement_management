import React, { useState, useEffect } from 'react';
import CDetails from '../COMPONENTS/cDetails';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CompanyDetails() {
    const [companyList, setCompanyList] = useState([]);
    const [refresh, setRefresh] = useState(false);  // State to trigger refresh
    const navigate = useNavigate();

    // Fetch company data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/CD");
                if (res.data==="No companies found"){
                    console.log("no comapny")
                }
                else{

                    setCompanyList(res.data); // Update company list with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);  // Re-fetch when `refresh` changes

    // Delete company function
   // Delete company function
async function deletecompany(companyName) {
    try {
        const response = await axios.delete(`http://localhost:3001/CD/${companyName}`);
        console.log(response.data.message); // Log the success message

        // Log the current state before updating
        console.log("Current company list:", companyList);

        // Filter out the deleted company and update the state
        setCompanyList(prevList => {
            const updatedList = prevList.filter(company => company.Companyname !== companyName);
            console.log("Updated company list after deletion:", updatedList); // Log the updated list
            return updatedList;
        });
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

    function CompanyInformation(companyName){
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
            info={()=>CompanyInformation(company.Companyname)}
            deletec={() => deletecompany(company.Companyname)} // Delete action
            updatec={() => updatecompany(company.Companyname)} // Update action
        />
    ));


    













    // Function to navigate to add company page
    function Addcompany() {
        navigate("/addcompanydetails");
    }

    return (
        <div>
            <div className='companydetails-header'>
                <div>COMPANY DETAILS</div>
                <img src="/icons8-plus-30.png" alt="Add" width={50} onClick={Addcompany} />
            </div>
            <div className='hello'>
                {companyList.length === 0 ? (
                    <p>No companies available.</p> // Message for an empty list
                ) : (
                    <table className='hi'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Company Name</th>
                                <th>Criteria</th>
                                <th>Date</th>
                                <th>Operations</th>
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

