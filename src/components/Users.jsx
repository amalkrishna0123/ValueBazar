import React, { useState } from "react";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import UsersTable from "./UsersTable";

const Users = () => {
  const [usersMenu, setUsersMenu] = useState(false);

  const toggleMenu2 = () => {
    setUsersMenu(!usersMenu);
  };

  return (
    <div className=" overflow-hidden">
      <Navbar toggleMenu2={toggleMenu2} />
      <div className="flex justify-center">
        <div className="hidden md:flex md:w-[20%] bg-[#f0eeef] h-screen fixed left-0">
          <SideNavbar />
        </div>
        <div className="md:w-[80%] w-full h-full md:ml-[300px]">
          <UsersTable usersMenu={usersMenu} setUsersMenu={setUsersMenu} toggleMenu2={toggleMenu2}/>
        </div>
      </div>
    </div>
  );
};

export default Users;
