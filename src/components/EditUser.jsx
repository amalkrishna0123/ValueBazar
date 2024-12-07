import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
import bgImage from "../assets/bgimage.jpg";
import blackShade from "../assets/blackshade.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EditUser = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Get user data from location state or localStorage
        const userData = location.state?.userData || JSON.parse(localStorage.getItem('userToEdit'));
        if (userData) {
            setFormData({
                name: userData.name || '',
                mobileNumber: userData.mobileNumber || '',
                username: userData.username || '',
                password: userData.password,
            });
        } else {
            navigate('/usersTable');
        }
    }, [location, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const db = getDatabase();
            const userData = location.state?.userData || JSON.parse(localStorage.getItem('userToEdit'));
            const updates = {
                name: formData.name,
                mobileNumber: formData.mobileNumber
            };

            await update(ref(db, `users/${userData.id}`), updates);
            navigate('/usersTable');
        } catch (error) {
            setError('Failed to update user: ' + error.message);
        }
    };

  return (
    <div className="h-screen w-full flex justify-center items-center">
            <div className="h-[500px] md:h-[500px] max-w-[900px] w-full mx-2 bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow">
                <div className="absolute w-full h-full">
                    <img src={bgImage} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="absolute w-full h-full backdrop-blur-sm">
                    <img src={blackShade} className="w-full h-full object-cover absolute" alt="" />
                </div>
                <div className='flex flex-col justify-center items-center w-full py-2 pt-10'>
                    <div className='relative text-[#fff] text-center text-3xl mb-5 font-bold'>Edit User</div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className='relative px-2 md:px-8 w-full flex flex-col justify-center items-center gap-5'>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder='Name'
                            className='py-3 px-8 w-full rounded-xl outline-none border-none'
                        />
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder='Mobile Number'
                            className='py-3 px-8 w-full rounded-xl outline-none border-none'
                        />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            disabled
                            placeholder='User Name'
                            className='py-3 px-8 w-full rounded-xl outline-none border-none bg-gray-100'
                        />
                        <div className='flex justify-center items-center relative w-full'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                disabled
                                placeholder='Password'
                                className='py-3 px-8 w-full rounded-xl outline-none border-none bg-gray-100'
                            />
                            <span className='absolute right-2 cursor-pointer text-gray-500' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-5 md:gap-10 relative'>
                            <Link to="/usersTable">
                                <button className='px-8 py-2 rounded-lg text-[#000] bg-[#fff] font-bold md:font-semibold'>
                                    Back
                                </button>
                            </Link>
                            <button
                                onClick={handleSubmit}
                                className='px-8 py-2 rounded-lg text-[#000] bg-[#fff] font-bold md:font-semibold'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default EditUser
