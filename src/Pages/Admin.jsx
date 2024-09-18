import {React,useState} from 'react'
import AdminPocAccess from '../COMPONENTS/AdminPocAccess'
import axios from 'axios'

const Admin = () => {
  const [showToaster, setShowToaster] = useState(false); // To show toaster

  return (
    <div className='w-full h-screen bg-gray_bg flex justify-center items-center flex-col gap-16'>
     <AdminPocAccess label="ADD POC" btn_name='Give POC Access' setShowToaster={setShowToaster}/>
     <AdminPocAccess label="REMOVE POC" btn_name='Remove POC Access' setShowToaster={setShowToaster}/>
     {showToaster.show && (
        <div
          className={`fixed top-4 right-4 py-2 px-4 rounded-md shadow-lg ${
            showToaster.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {showToaster.message}
        </div>
      )}
    </div>
  )
}

export default Admin