import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { getDatabase, ref, update } from "firebase/database"
import { toast } from 'react-hot-toast'
import bgImage from "../assets/bgimage.jpg"
import blackShade from "../assets/blackshade.png"
import { Link } from "react-router-dom"

const EditCustomer = () => {

  const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        address: '',
        cardNumber: '',
        mobileNumber: '',
        locationArea: ''
    });

    useEffect(() => {
        // Check if customer data is passed in location state
        if (location.state?.customer) {
            const { customer } = location.state;
            setFormData({
                customerName: customer.customerName || '',
                address: customer.address || '',
                cardNumber: customer.cardNumber || '',
                mobileNumber: customer.mobileNumber || '',
                locationArea: customer.locationArea || ''
            });
        } else {
            // If no customer data, redirect back to admin panel
            toast.error('No customer selected for editing');
            navigate('/adminPannel');
        }
    }, [location.state, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const db = getDatabase();
            const customerRef = ref(db, `customers/${location.state.customer.id}`);

            // Update customer data
            await update(customerRef, formData);

            toast.success('Customer updated successfully!');
            navigate('/adminPannel');
        } catch (error) {
            console.error('Error updating customer:', error);
            toast.error('Failed to update customer');
        }
    };

  return (
    <div className="h-screen w-full flex justify-center items-center">
            <div className=" h-[500px] md:h-[500px] max-w-[900px] w-full mx-2 bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow">
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
                {/* Edit Contents */}
                <div className=' flex flex-col justify-center items-center w-full py-2 pt-5'>
                    <div className=' relative text-[#fff] text-center text-3xl mb-5 font-bold'>Edit Customer</div>
                    <form onSubmit={handleSave} className=' relative px-5 md:px-8 w-full flex flex-col justify-center items-center gap-5'>
                        <input 
                            type="text" 
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            placeholder='Customer Name' 
                            className='py-3 px-8 w-full rounded-xl outline-none border-none' 
                            required
                        />
                        <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder='Address' 
                            className='py-3 px-8 w-full rounded-xl outline-none border-none' 
                            required
                        />
                        <input 
                            type="text" 
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder='Card Number' 
                            className='py-3 px-8 w-full rounded-xl outline-none border-none'
                            required
                        />
                        <input 
                            type="text" 
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder='Mobile Number' 
                            className='py-3 px-8 w-full rounded-xl outline-none border-none'
                            required
                        />
                        <input 
                            type="text" 
                            name="locationArea"
                            value={formData.locationArea}
                            onChange={handleInputChange}
                            placeholder='Place' 
                            className='py-3 px-8 w-full rounded-xl outline-none border-none'
                            required
                        />
                        <div className='flex justify-center items-center gap-5 md:gap-10 relative'>
                            <Link to="/adminPannel">
                                <button 
                                    type="button"
                                    className='px-8 py-2 rounded-lg text-[#000] bg-[#fff] font-bold md:font-semibold'
                                >
                                    Back
                                </button>
                            </Link>
                            <button 
                                type="submit"
                                className='px-8 py-2 rounded-lg text-[#000] bg-[#fff] font-bold md:font-semibold'
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default EditCustomer
