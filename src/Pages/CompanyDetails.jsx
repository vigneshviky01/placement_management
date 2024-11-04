import React, { useState, useEffect } from 'react'; // Correctly import useState and useEffect
import CDetails from '../COMPONENTS/cDetails';
import companies from '../../constants/companies';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function CompanyDetails() {
    const [companyList, setCompanyList] = useState([]); // Correct useState placement
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/CD");
                setCompanyList(res.data);
            } catch (error) {
                console.error("Error fetching company data", error);
            }
        };

        fetchData();
    }, []); // Removed companyList dependency to avoid infinite loop

    // Use .map and return JSX
    const company_list = companyList.map((company, index) => {
        return (
            <CDetails
                key={index}
                Sno={index + 1}
                name={company.Companyname}
                criteria={company.criteria}
                date={company.date}
            />
        );
    });

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

                <table className='hi'>
                    <tr className=''>

                        <th>S.No</th>

                        <th >Company Name</th>
                        <th >Criteria</th>
                        <th >Date</th>
                        <td >Operations</td>
                    </tr>

                    {company_list}

                </table>
            </div>
        </div>
    );
}

export default CompanyDetails;

