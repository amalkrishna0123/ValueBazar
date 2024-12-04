import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { motion } from "framer-motion"
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";


const MobileNavbarMenus = ({openMenu, setOpenMenu,setUsersMenu,usersMenu}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div className='fixed top-0 left-0 h-full w-full bg-[#fff] bg-opacity-25 backdrop-blur-sm'>
      <motion.div
      initial={{ x : -100, opacity:0 }}
      animate={{ x : 0, opacity:1,transition:{ease:"backInOut",duration:1} }}
      exit={{ x : -100, opacity : .5, transition:{ease:"easeOut",duration:1}}}
      className='fixed top-0 left-0 h-full w-[70%] bg-[#fff] z-10 rounded-r-3xl backdrop-blur-3xl BackgroundColor'>
        <div className='absolute right-5 top-10 text-xl font-bold cursor-pointer text-[#fff]' onClick={()=>{
          setUsersMenu(!usersMenu)
          setIsOpen(!openMenu)
        }}>
            <IoClose/>
        </div>
        <div className='flex justify-center items-center h-full'>
            <ul className='text-[#fff] flex flex-col justify-center items-start gap-5 text-xl'>
                <Link to="/adminPannel">
                  <motion.li
                  initial={{ y : 100, opacity:0}}
                  animate={{ y : 0, opacity:1, transition:{ ease:"backInOut", duration:1,delay:.6}}}
                  className='flex justify-center items-center gap-2 cursor-pointer' onClick={()=>setOpenMenu(!openMenu)}><span><FaPeopleGroup/></span>Customer</motion.li>
                </Link>
                <Link to="/usersTable">
                  <motion.li
                  initial={{ y : 100, opacity:0}}
                  animate={{ y : 0, opacity:1, transition:{ ease:"backInOut", duration:1,delay:.9}}}
                  className='flex justify-center items-center gap-2 cursor-pointer' onClick={()=>setOpenMenu(!openMenu)}><span><FaUser/></span>Users</motion.li>
                </Link>
            </ul>
        </div>
        {/* Bottom Side */}
      <div className=' relative z-20 flex flex-col justify-center items-center'>
        <div className='absolute bottom-10'>
            <motion.div
            initial={{y:100, opacity:0}}
            animate={{ y:0,opacity:1,transition:{ease:"backInOut",duration:.5,delay:1}}}
            className='h-[100px] mb-10'>
                <img src={logo} className='w-full h-full object-contain' alt="" />
            </motion.div>
            {/* Social Links */}
            <div className=' flex justify-center items-center gap-3 text-xl text-[#fff]'>
                <motion.div
                initial={{ x:100, opacity:0}}
                animate={{x:0,opacity:1,transition:{ease:"backInOut",duration:1,delay:1}}}
                ><AiFillInstagram className='drop-shadow-sm cursor-pointer'/></motion.div>
                <motion.div
                initial={{x:100,opacity:0}}
                animate={{x:0,opacity:1,transition:{ease:"backInOut",duration:1,delay:1.1}}}
                >
                  <FaFacebook className='drop-shadow-sm cursor-pointer'/>
                </motion.div>
                <motion.div
                initial={{x:100,opacity:0}}
                animate={{x:0,opacity:1,transition:{duration:1,ease:"backInOut",delay:1.2}}}
                >
                  <IoLogoWhatsapp className='drop-shadow-sm cursor-pointer'/>
                </motion.div>
                <motion.div
                initial={{x:100,opacity:0}}
                animate={{x:0,opacity:1,transition:{ease:"backInOut",delay:1.3,duration:1}}}
                >
                  <FaYoutube className='drop-shadow-sm cursor-pointer'/>
                </motion.div>
            </div>
        </div>
      </div>
      </motion.div>
    </div>
  )
}

export default MobileNavbarMenus
