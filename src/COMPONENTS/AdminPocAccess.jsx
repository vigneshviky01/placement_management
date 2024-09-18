import axios from 'axios';
import React, { useState } from 'react';

const AdminPocAccess = ({ label, btn_name, setShowToaster }) => {
    const [email, SetEmail] = useState("");

    const addPOC = async () => {
        if (email === '') {
            setShowToaster({ show: true, message: "Email is not filled", type: "error" });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/add-poc', {
                Email: email,
            });
            
            if (response.status === 200) {
                setShowToaster({ show: true, message: "POC added successfully", type: "success" });
            }
        } catch (error) {
            setShowToaster({ show: true, message: "Error adding POC", type: "error" });
        }
    };

    const removePOC = async () => {
        if (email === '') {
            setShowToaster({ show: true, message: "Email is not filled", type: "error" });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/remove-poc', {
                Email: email,
            });
            
            if (response.status === 200) {
                setShowToaster({ show: true, message: "POC removed successfully", type: "success" });
            }
        } catch (error) {
            setShowToaster({ show: true, message: "Error removing POC", type: "error" });
        }
    };

    return (
        <div className='flex flex-col justify-between'>
            <div className='bg-primary p-4 rounded-2xl'>
                <div className='border-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-secondary border-dashed rounded-xl border-secondary flex flex-col items-start justify-end pt-10 px-16 max-sm:px-6 pb-5 gap-5'>
                    <div className='bg-secondary px-3 rounded-2xl py-1 w-max -mt-14 font-semibold text-white'>
                        {label}
                    </div>
                    <div className='flex flex-row max-sm:flex-col gap-3'>
                        <p className='text-white text-xl font-semibold'>Enter Email: </p>
                        <input
                            className='bg-gray_bg h-7 w-64 text-center'
                            value={email}
                            onChange={(e) => { SetEmail(e.target.value); }}
                        />
                    </div>
                    <div className='w-full flex justify-center max-sm:justify-start'>
                        <div
                            className='px-10 py-2 rounded-xl w-max text-md bg-btn-clr text-white font-semibold cursor-pointer'
                            onClick={label === "ADD POC" ? addPOC : removePOC}
                        >
                            {btn_name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPocAccess;
