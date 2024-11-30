import bgImage from "../assets/bgImage.jpg"
import blackShade from "../assets/blackshade.png"
import logo from "../assets/logo.png"

const AddCustomers = () => {
  return (
    <div className='flex justify-center items-center h-screen overflow-hidden backdrop-blur-3xl'>
      <div className='flex justify-center items-center max-w-[900px] w-full md:h-[650px] h-[900px] bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow'>
      <div className='absolute w-full h-full'>
            <img src={bgImage} className='w-full h-full object-cover' alt="" />
        </div>
        <div className=' absolute w-full h-full backdrop-blur-sm'>
            <img src={blackShade} className='w-full h-full object-cover absolute' alt="" />
        </div>
        {/* Contents */}
        <div className="w-full px-4">
            {/* Logo */}
            <div className="">
                <div className="h-[100px] absolute z-10 top-5 left-20">
                    <img src={logo} className="w-full h-full object-contain" alt="" />
                </div>
            </div>
            {/* Add Customers */}
            <div className="text-[#fff] relative mb-10 text-center text-[40px] font-semibold">Add Customers</div>
            <div className="relative text-[#fff] w-full px-16 flex flex-col justify-center gap-5 mb-10">
                {/* Customer Name */}
                <div className="flex items-center gap-10">
                    <span className="text-2xl whitespace-nowrap flex justify-start w-1/4">Customer Name</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-3/4"
                    />
                </div>

                {/* Card Number */}
                <div className="flex items-center gap-10">
                    <span className="text-2xl whitespace-nowrap flex justify-start w-1/4">Card Number</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-3/4"
                    />
                </div>

                {/* Mobile Number */}
                <div className="flex items-center gap-10">
                    <span className="text-2xl whitespace-nowrap flex justify-start w-1/4">Mobile Number</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-3/4"
                    />
                </div>

                {/* Address */}
                <div className="flex items-center gap-10">
                    <span className="text-2xl whitespace-nowrap flex justify-start w-1/4">Address</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-3/4"
                    />
                </div>

                {/* Location / Area */}
                <div className="flex items-center gap-10">
                    <span className="text-2xl whitespace-nowrap flex justify-start w-1/4">Location / Area</span>
                    <input
                        type="text"
                        className="border-none outline-none py-3 px-4 rounded-3xl w-3/4"
                    />
                </div>
            </div>

            <div className="flex justify-center items-center gap-5 relative">
                    <button className="px-8 py-2 rounded-3xl bg-[#fff] text-[#000000] font-semibold">Back</button>
                    <button className="px-8 py-2 rounded-3xl bg-[#fff] text-[#00000] font-semibold">Submit</button>
                </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomers
