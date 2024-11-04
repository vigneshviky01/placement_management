import React from 'react'

const CompanyCard = ({
    Companyname,
    criteria,
    ctc,
    dept,
    skills,
    date,
    recruitmentProcess,
    location,
    bond
}) => {
    return (
        <div className='flex flex-col items-center gap-4 border-2 shadow-md px-10 py-5 sm:w-[600px]'>
            <h2 className='font-bold text-md text-center'>{Companyname}</h2>
            <div className='flex flex-col items-start gap-2'>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Eligibility Criteria: </p>
                    <p>{criteria}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Skills Required: </p>
                    <p>{skills}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='font-semibold'>CTC Offered: </p>
                    <p>{ctc}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Open to Depts: </p>
                    <p>{dept}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Drive scheduled on: </p>
                    <p>{date}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Service Agreement: </p>
                    <p>{bond}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Locations: </p>
                    <p>{location}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Recruitment Process: </p>
                    <p>{recruitmentProcess}</p>
                </div>
            </div>
            <div className='bg-gray-400 text-white px-3 py-2 rounded-md font-semibold tracking-wide cursor-pointer'>
                Apply
            </div>
        </div>
    )
}

export default CompanyCard
