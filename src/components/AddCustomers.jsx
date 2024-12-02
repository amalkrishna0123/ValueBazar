import bgImage from "../assets/bgimage.jpg"
import blackShade from "../assets/blackshade.png"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"

const AddCustomers = () => {
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
            <div className="text-[#fff] relative mb-5 md:mb-10 text-center md:text-[40px] text-[30px] font-semibold">Add Customers</div>
            <div className="relative w-full px-2 md:px-16 flex flex-col justify-center gap-2 md:gap-5 mb-10 text-[#fff]">
                {/* Customer Name */}
                <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                    <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">Customer Name</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                    />
                </div>

                {/* Card Number */}
                <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                    <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">Card Number</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                    />
                </div>

                {/* Mobile Number */}
                <div className=" grid place-items-center md:flex items-center gap-2 md:gap-10">
                    <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">Mobile Number</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                    />
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                    <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">Address</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                    />
                </div>

                {/* Location / Area */}
                <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2  md:gap-10">
                    <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">Location / Area</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                    />
                </div>
            </div>

            <div className="flex justify-center items-center gap-5 relative">
                    <Link to="/adminPannel">
                        <button className="px-8 py-2 rounded-3xl bg-[#fff] text-[#000000] font-semibold">Back</button>
                    </Link>
                    <button className="px-8 py-2 rounded-3xl bg-[#fff] text-[#00000] font-semibold">Submit</button>
                </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomers
