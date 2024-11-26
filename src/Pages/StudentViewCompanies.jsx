import React, { useState, useEffect } from 'react';
import CompanyCard from '../COMPONENTS/CompanyCard'
import companyDetails from '../constants/companyDetails.js'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CompanyDetails = () => {

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
}, []);






  return (
    <div className='flex flex-col w-full gap-8 mb-5'>
        <h2 className='text-xl font-semibold font-mono py-6 pl-4'>List Of Companies in Line:</h2>
        <div className='flex flex-col items-center gap-7 '>
            {companyList.map((item,key)=>{
                return  <CompanyCard key={key} {...item} />
            })}
           
        </div>
    </div>
  )
}

export default CompanyDetails