import React from 'react'
import logo from "../assets/logo.png"
import { FaUserAltSlash } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";

const Navbar = ({toggleMenu}) => {
  return (
    <div className=' fixed top-0 w-full p-2 bg-[#000] flex justify-between px-2 lg:px-6 items-center rounded-b-lg md:rounded-b-none CustomerBox'>
      <div className='h-[60px] md:h-[80px] w-auto'>
        <img src={logo} alt="" className='h-full w-full object-contain' />
      </div>
      <div className='text-[#fff] font-semibold text-xl flex justify-center items-center gap-2 cursor-pointer'>
        <span className=' hidden md:flex'>Logout</span> <span className='pr-3 md:pr-0'><FaUserAltSlash/></span>
        <span className='text-3xl md:hidden' onClick={toggleMenu}><HiMenuAlt4/></span>
      </div>
    </div>
  )
}

export default Navbar
