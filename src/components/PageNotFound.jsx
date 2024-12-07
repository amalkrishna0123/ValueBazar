import React from "react";
import emoji from "../assets/emoji.png";

const PageNotFound = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" flex flex-col justify-center items-center max-w-[700px]">
        <div className="flex justify-center items-center h-[200px] w-[300px] mb-5">
            <img src={emoji} className="object-contain h-full w-full" alt="" />
        </div>
        <div className="text-[28px] font-bold text-center mb-2">Page Not Found</div>
        <div className="text-center px-2 text-sm font-semibold">The page you're trying to access is currently unavailable or doesn't exist. If you believe this is an error, please contact the administrator for further assistance.</div>
      </div>
    </div>
  );
};

export default PageNotFound;
