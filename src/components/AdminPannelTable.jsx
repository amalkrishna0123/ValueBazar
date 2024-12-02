import React from 'react'
import { MdLocationPin } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import AddCustomers from './AddCustomers';
import { Link } from "react-router-dom"
import MobileAdminPannel from './MobileAdminPannel';

const AdminPannelTable = ({openMenu, setOpenMenu}) => {
  return (
    <div className='pt-[100px] md:pt-[150px] md:pl-[50px] flex flex-col justify-center items-center'>
        <div className='md:hidden w-full'>
            <MobileAdminPannel openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        </div>
        <div className=' md:flex justify-between items-center flex-wrap mb-10 w-full pr-5 hidden'>
            <Link to="/addCustomers">
                <div className='px-8 py-3 bg-[#00a2ff] rounded-3xl flex justify-center items-center gap-3 font-semibold text-[#fff] cursor-pointer CustomerBox'>
                    Add Customers <span><FaPlus/></span>
                </div>
            </Link>
            <div className=' px-8 py-3 rounded-lg bg-[#ff9192] flex justify-center items-center CustomerBox'>
                <div className='flex flex-col justify-center items-center text-center font-semibold text-[#fff]'>Number Of Customers
                    <span className='text-3xl font-bold'>100</span>
                </div>
            </div>
            <div className=' relative flex justify-center items-center'>
                <input type="text" placeholder='Search....' className='pl-4 pr-8 py-3 rounded-3xl border-none outline-none CustomerBox' />
                <span className=' absolute right-3'><LuSearch/></span>
            </div>
        </div>
      <div className='overflow-x-auto w-full'>
        <table className='table-auto w-full border-collapse border border-gray-300 text-center'>
          <thead className='bg-gray-100 text-sm text-nowrap text-center'>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>Customer Name</th>
              <th className='border border-gray-300 px-4 py-2'>Address</th>
              <th className='border border-gray-300 px-4 py-2'>Card No.</th>
              <th className='border border-gray-300 px-4 py-2'>Mobile No.</th>
              <th className='border border-gray-300 px-4 py-2'>Place</th>
              <th className='border border-gray-300 px-4 py-2'>Location</th>
              <th className='border border-gray-300 px-4 py-2'>Created by Users</th>
              <th className='border border-gray-300 px-4 py-2'>Date</th>
            </tr>
          </thead>

          <tbody className='text-center text-sm text-nowrap'>
            <tr className='hover:bg-gray-50'>
              <td className='border border-gray-300 px-4 py-2'>Amal</td>
              <td className='border border-gray-300 px-4 py-2'>ABCD Address</td>
              <td className='border border-gray-300 px-4 py-2'>268878</td>
              <td className='border border-gray-300 px-4 py-2'>8852387898</td>
              <td className='border border-gray-300 px-4 py-2'>Calicut</td>
              <td className='border border-gray-300 px-4 py-2 cursor-pointer text-xl'><MdLocationPin/></td>
              <td className='border border-gray-300 px-4 py-2'>Demo user</td>
              <td className='border border-gray-300 px-4 py-2'>02/12/2024</td>
            </tr>
            <tr className='hover:bg-gray-50'>
              <td className='border border-gray-300 px-4 py-2'>Rahul</td>
              <td className='border border-gray-300 px-4 py-2'>XYZ Address</td>
              <td className='border border-gray-300 px-4 py-2'>457897</td>
              <td className='border border-gray-300 px-4 py-2'>9876543210</td>
              <td className='border border-gray-300 px-4 py-2'>Ernakulam</td>
              <td className='border border-gray-300 px-4 py-2 cursor-pointer text-xl'><MdLocationPin/></td>
              <td className='border border-gray-300 px-4 py-2'>Admin user</td>
              <td className='border border-gray-300 px-4 py-2'>01/12/2024</td>
            </tr>
            <tr className='hover:bg-gray-50 text-center'>
              <td className='border border-gray-300 px-4 py-2'>Neha</td>
              <td className='border border-gray-300 px-4 py-2'>LMNO Address</td>
              <td className='border border-gray-300 px-4 py-2'>389028</td>
              <td className='border border-gray-300 px-4 py-2'>9123456789</td>
              <td className='border border-gray-300 px-4 py-2'>Trivandrum</td>
              <td className='border border-gray-300 px-4 py-2 cursor-pointer text-xl'><MdLocationPin/></td>
              <td className='border border-gray-300 px-4 py-2'>User1</td>
              <td className='border border-gray-300 px-4 py-2'>30/11/2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPannelTable
