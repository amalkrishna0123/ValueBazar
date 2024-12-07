import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDatabase, ref, remove } from "firebase/database"
import { toast } from 'react-hot-toast'
import bgImage from "../assets/bgimage.jpg"
import blackShade from "../assets/blackshade.png"


const ConfirmationDeletion2 = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState('');

  // Get customer and predefined security code from navigation state
  const customer = location.state?.customer;
  const expectedSecurityCode = location.state?.securityCode;

  const handleDelete = async () => {
    // Validate security code
    if (enteredCode !== expectedSecurityCode) {
      setError('Incorrect security code');
      return;
    }

    try {
      // Delete customer from Firebase
      const db = getDatabase();
      const customerRef = ref(db, `customers/${customer.id}`);
      
      await remove(customerRef);
      
      toast.success('Customer deleted successfully!');
      navigate('/adminPannel');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
    }
  };

  const handleBack = () => {
    navigate('/adminPannel');
  };

  // Redirect if no customer selected
  if (!customer) {
    navigate('/adminPannel');
    return null;
  }

  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center bg-[#fff]">
      <div className="flex justify-center items-center max-w-[700px] w-full md:h-[300px] h-[300px] bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow text-center">
        <div className="absolute w-full h-full">
          <img src={bgImage} className="w-full h-full object-cover" alt="" />
        </div>
        <div className=" absolute w-full h-full backdrop-blur-sm">
          <img
            src={blackShade}
            className="w-full h-full object-cover absolute"
            alt=""
          />
        </div>
        <div className='flex flex-col justify-center relative'>
          <div className=" relative text-[#fff] font-bold text-lg md:text-2xl text-center mx-auto w-full flex justify-center items-center mb-5">
            Enter Security Code to Delete Customer: {customer.customerName}
          </div>
          {error && <div className="text-red-500 mb-3">{error}</div>}
          <div className='w-full mb-5 px-2'>
            <input 
              type="text" 
              placeholder="Enter Your Security Code"  
              value={enteredCode}
              onChange={(e) => {
                setEnteredCode(e.target.value);
                setError('');
              }}
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
  )
}

export default ConfirmationDeletion2
