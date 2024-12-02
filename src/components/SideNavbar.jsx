import React,{ useState } from 'react'
import { LuMenu } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"


const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='px-4 pt-[150px] flex justify-center w-full'>
      <div>
        <ul className='flex justify-center items-start flex-col gap-5'>
            <li className='flex justify-center items-center gap-2 text-xl cursor-pointer'><span><FaPeopleGroup/></span>Customer</li>
            {/* <li className="NavbarHover">
                  <div className="flex flex-col">
                    <div
                      className="flex justify-center items-center gap-2 cursor-pointer text-xl"
                      onClick={toggleDropdown}
                    >
                      <div>
                        <LuMenu/>
                      </div>
                      <div>Customer</div>
                    </div>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2"
                      >
                        <li className="pl-5 mt-2 insideNavbarHover">
                          <NavLink
                            to="#"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-2 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <FaUser />
                            </div>
                            <div>User</div>
                          </NavLink>
                        </li>
                        <li className="pl-5 mt-3 insideNavbarHover">
                          <NavLink
                            to="#"
                            className={({ isActive }) =>
                              `flex justify-start items-center gap-2 ${
                                isActive ? "text-[#ff9100] font-bold" : ""
                              }`
                            }
                          >
                            <div>
                              <FaLocationDot />
                            </div>
                            <div>Place</div>
                          </NavLink>
                        </li>
                      </motion.ul>
                    )}
                  </div>
                </li> */}
            <Link to="/userCreation">
              <li className='flex justify-center items-center gap-2 text-xl cursor-pointer'><span><FaUser/></span>User</li>
            </Link>
        </ul>
      </div>
    </div>
  )
}

export default SideNavbar
