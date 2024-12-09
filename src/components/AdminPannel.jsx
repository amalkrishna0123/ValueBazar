import React, { useState } from "react";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import AdminPannelTable from "./AdminPannelTable";

const AdminPannel = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className=" overflow-hidden">
      <Navbar toggleMenu={toggleMenu} />
      <div className="flex justify-center">
        <div className="hidden md:flex md:w-[20%] bg-[#f0eeef] h-screen fixed left-0">
          <SideNavbar />
        </div>
        <div className="md:w-[80%] md:ml-[300px] w-full h-full">
          <AdminPannelTable openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;
