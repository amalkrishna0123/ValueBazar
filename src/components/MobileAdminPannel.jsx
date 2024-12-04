import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { HiPlusSm } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import MobileNavbarMenus from './MobileNavbarMenus';

const MobileAdminPannel = ({openMenu, setOpenMenu}) => {

  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.name); // Set the fetched name
          } else {
            setUserName("Value Bazar Admin");
          }
        } else {
          setUserName("Guest");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Error");
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full px-2 mb-5">
        <div className=" leading-tight flex flex-col justify-center items-start w-full">
          <div className="text-[12px] font-semibold">Welcome Back</div>
          <div className="font-bold text-lg">{userName}</div>
        </div>
        <div className="">
          <Link to="/addCustomers">
            <div className="p-1 rounded-full bg-[#f0eeef] font-bold text-3xl drop-shadow-sm cursor-pointer">
              <HiPlusSm />
            </div>
          </Link>
        </div>
      </div>
      {/* Customer Dashboard */}
      <div className="BgColor h-[150px] mx-2 rounded-3xl CustomerBox mb-5 text-[#fff] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center font-semibold">
          Number of Customers
          <span className="text-3xl font-bold">100</span>
        </div>
      </div>
      {/* Search Bar */}
      <div className=" relative mb-5 mx-2 flex justify-center items-center">
        <input
          type="text"
          placeholder="search....."
          className="py-3 pl-4 w-full rounded-lg drop-shadow-md outline-none border-none Background"
        />
        <span className=" absolute right-3 text-xl">
          <FiSearch />
        </span>
      </div>
      {openMenu && (
        <MobileNavbarMenus openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      )}
    </div>
  );
}

export default MobileAdminPannel
