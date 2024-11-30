import React from 'react'
import bgImage from "../assets/bgImage.jpg"
import blackShade from "../assets/blackshade.png"
import logo from "../assets/logo.png"

const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen overflow-hidden w-full px-2 backdrop-blur-3xl'>
      <div className='flex justify-center items-center max-w-[900px] w-full md:h-[500px] h-[650px] bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow'>
        <div className='absolute w-full h-full'>
            <img src={bgImage} className='w-full h-full object-cover' alt="" />
        </div>
        <div className=' absolute w-full h-full backdrop-blur-sm'>
            <img src={blackShade} className='w-full h-full object-cover absolute' alt="" />
        </div>
        <div className='grid grid-cols-1 place-items-center md:flex justify-between items-center w-full'>
            {/* Left - Logo */}
            <div className='w-[50%] flex justify-center items-center'>
                <div className=' relative z-10 h-[300px]'>
                    <img src={logo} className='h-full w-full object-contain' alt="" />
                </div>
            </div>
            {/* Right - Login */}
            <div className=' relative z-10 md:w-[50%] flex flex-col justify-center items-center w-full'>
                <div className='text-[#fff8f2] mb-10 text-[32px] font-bold pl-4'>Login</div>
                <form action="" className='flex flex-col justify-center items-center gap-5 w-full px-4'>
                    <input type="email" placeholder='User Name' className='w-full outline-none border-none bg-[#fff8f2] rounded-3xl py-3 md:py-2 px-4' />
                    <input type="password" placeholder='Password' className='w-full outline-none border-none bg-[#fff8f2] rounded-3xl py-3 md:py-2 px-4'/>
                    <div>
                        <button className='rounded-3xl py-2 px-8 bg-[#fff8f2] font-semibold'>Login</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
