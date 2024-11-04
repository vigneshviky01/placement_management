import React from 'react'
import CompanyCard from '../COMPONENTS/CompanyCard'
import companyDetails from '../constants/companyDetails.js'
const CompanyDetails = () => {
  return (
    <div className='flex flex-col w-full gap-8'>
        <h2 className='text-xl font-semibold font-mono py-6 pl-4'>List Of Companies in Line:</h2>
        <div className='flex flex-col items-center gap-7 '>
            {companyDetails.map((item,key)=>{
                return  <CompanyCard key={key} {...item} />
            })}
           
        </div>
    </div>
  )
}

export default CompanyDetails