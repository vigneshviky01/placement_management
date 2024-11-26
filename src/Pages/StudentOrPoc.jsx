import React from 'react'
import {  useNavigate } from 'react-router-dom'

const StudentOrPoc = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen bg-gray_bg flex justify-center items-center'>
        <div className='flex max-sm:flex-col flex-row gap-8'>
        <div className='bg-primary cursor-pointer text-white font-semibold max-sm:px-7 px-9 rounded-md text-center sm:text-xl  max-sm:py-4 py-6 ' onClick={()=>{navigate('/viewcompanydetails')}}>
                Login as POC
            </div>
            <div className='bg-primary cursor-pointer text-white font-semibold max-sm:px-7 px-9 text-center rounded-md sm:text-xl max-sm:py-4 py-6 ' onClick={()=>{navigate('/student')}}>
                Login as Student
            </div>
        </div>
    </div>
  )
}

export default StudentOrPoc