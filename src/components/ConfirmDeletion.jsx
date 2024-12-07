import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, remove } from 'firebase/database';
import bgImage from "../assets/bgimage.jpg";
import blackShade from "../assets/blackshade.png";

const ConfirmDeletion = () => {

    const [securityCode, setSecurityCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const SECURITY_CODE = '313@vb';

    const handleDelete = async () => {
        if (securityCode === SECURITY_CODE) {
            try {
                const userId = localStorage.getItem('userToDelete');
                const db = getDatabase();
                
                // Delete user from database
                await remove(ref(db, `users/${userId}`));
                
                // Clear the stored user ID
                localStorage.removeItem('userToDelete');
                
                // Navigate back to users table
                navigate('/usersTable');
            } catch (error) {
                setError('Error deleting user. Please try again.');
            }
        } else {
            setError('Invalid security code');
        }
    };

    const handleBack = () => {
        localStorage.removeItem('userToDelete');
        navigate('/usersTable');
    };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center bg-[#fff]">
            <div className="flex justify-center items-center max-w-[700px] w-full md:h-[300px] h-[300px] bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow text-center">
                <div className="absolute w-full h-full">
                    <img src={bgImage} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="absolute w-full h-full backdrop-blur-sm">
                    <img src={blackShade} className="w-full h-full object-cover absolute" alt="" />
                </div>
                <div className='flex flex-col justify-center relative'>
                    <div className="relative text-[#fff] font-bold text-lg md:text-2xl text-center mx-auto w-full flex justify-center items-center mb-5">
                        Enter Security Code to Delete User
                    </div>
                    {error && (
                        <div className="text-red-500 mb-3">{error}</div>
                    )}
                    <div className='w-full mb-5 px-2'>
                        <input 
                            type="text" 
                            placeholder="Enter Security Code" 
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            className='w-full py-2 px-4 rounded-md border-none outline-none'
                        />
                    </div>
                    <div className='flex justify-center gap-5'>
                        <button 
                            onClick={handleBack}
                            className='bg-[#fff] px-8 py-2 rounded-md font-semibold'
                        >
                            Back
                        </button>
                        <button 
                            onClick={handleDelete}
                            className='bg-[#fff] px-8 py-2 rounded-md font-semibold'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ConfirmDeletion
