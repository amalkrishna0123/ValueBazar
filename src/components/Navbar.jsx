import React from "react";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase functions
import logo from "../assets/logo.png";
import { FaUserAltSlash } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // For navigation after logout

const Navbar = ({ toggleMenu, toggleMenu2 }) => {
  const navigate = useNavigate(); // React Router navigation hook

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Log out the user
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="fixed top-0 w-full p-2 bg-[#000] flex justify-between px-2 lg:px-6 items-center rounded-b-lg md:rounded-b-none CustomerBox">
      <div className="h-[60px] md:h-[80px] w-auto">
        <img src={logo} alt="Logo" className="h-full w-full object-contain" />
      </div>
      <div className="text-[#fff] font-semibold text-xl flex justify-center items-center gap-2 cursor-pointer">
        <span className="hidden md:flex" onClick={handleLogout}>
          Logout
        </span>
        <span className="pr-3 md:pr-0" onClick={handleLogout}>
          <FaUserAltSlash />
        </span>
        <span
          className="text-3xl md:hidden"
          onClick={() => {
            toggleMenu?.();
            toggleMenu2?.();
          }}
        >
          <HiMenuAlt4 />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
