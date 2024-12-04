import React, { useState } from 'react'
import { getAuth } from "firebase/auth"
import { getDatabase, ref, push } from "firebase/database"
import { Link, useNavigate } from "react-router-dom"
import bgImage from "../assets/bgimage.jpg"
import blackShade from "../assets/blackshade.png"
import logo from "../assets/logo.png"

const AddCustomers = () => {

    const [formData, setFormData] = useState({
        customerName: '',
        cardNumber: '',
        mobileNumber: '',
        address: '',
        locationArea: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function to get user's current location using Geolocation API
    const fetchCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
                        resolve({ lat, lng, googleMapsLink });
                    },
                    (error) => {
                        reject('Unable to retrieve your location');
                    }
                );
            } else {
                reject('Geolocation is not supported by this browser.');
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Get current authenticated user
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error('User not authenticated');
            }

            // Fetch current location coordinates
            const locationData = await fetchCurrentLocation();

            // Prepare customer data
            const customerData = {
                ...formData,
                createdBy: user.displayName || user.email, // Use display name or email
                createdAt: new Date().toISOString(),
                createdByUserId: user.uid,
                location: locationData ? {
                    latitude: locationData.lat,
                    longitude: locationData.lng,
                    googleMapsLink: locationData.googleMapsLink
                } : null
            };

            // Save to Firebase Realtime Database
            const db = getDatabase();
            const customersRef = ref(db, 'customers');
            await push(customersRef, customerData);

            // Reset form and navigate
            setFormData({
                customerName: '',
                cardNumber: '',
                mobileNumber: '',
                address: '',
                locationArea: ''
            });

            navigate("/adminPannel");
        } catch (error) {
            setError(error.message);
            console.error('Error adding customer:', error);
        }
    };

    return (
        <div className='flex justify-center items-center md:h-screen py-2 md:py-5 overflow-hidden backdrop-blur-3xl px-2'>
            <div className='flex justify-center items-center max-w-[900px] w-full md:h-[650px] h-[800px] bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow'>
                <div className='absolute w-full h-full'>
                    <img src={bgImage} className='w-full h-full object-cover' alt="" />
                </div>
                <div className=' absolute w-full h-full backdrop-blur-sm'>
                    <img src={blackShade} className='w-full h-full object-cover absolute' alt="" />
                </div>
                {/* Contents */}
                <div className="w-full px-4">
                    {/* Logo */}
                    <div className="mb-20 md:mb-0">
                        <div className="h-[100px] absolute z-10 top-5 left-20">
                            <img src={logo} className="w-full h-full object-contain" alt="" />
                        </div>
                    </div>

                    {/* Add Customers */}
                    <div className="text-[#fff] relative mb-5 md:mb-10 text-center md:text-[40px] text-[30px] font-semibold">
                        Add Customers
                    </div>

                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                    <form onSubmit={handleSubmit} className="relative w-full px-2 md:px-16 flex flex-col justify-center gap-2 md:gap-5 mb-10 text-[#fff]">
                        {/* Customer Name */}
                        <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                            <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                                Customer Name
                            </span>
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleInputChange}
                                className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                                required
                            />
                        </div>

                        {/* Card Number */}
                        <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                            <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                                Card Number
                            </span>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                                required
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="grid place-items-center md:flex items-center gap-2 md:gap-10">
                            <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                                Mobile Number
                            </span>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                            <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                                Address
                            </span>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                                required
                            />
                        </div>

                        {/* Location / Area */}
                        <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                            <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                                Location / Area
                            </span>
                            <input
                                type="text"
                                name="locationArea"
                                value={formData.locationArea}
                                onChange={handleInputChange}
                                className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                                required
                            />
                        </div>

                        <div className="flex justify-center items-center gap-5 relative mt-5">
                            <Link to="/adminPannel">
                                <button 
                                    type="button"
                                    className="px-8 py-2 rounded-3xl bg-[#fff] text-[#000000] font-semibold"
                                >
                                    Back
                                </button>
                            </Link>
                            <button 
                                type="submit" 
                                className="px-8 py-2 rounded-3xl bg-[#fff] text-[#000] font-semibold"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCustomers;
