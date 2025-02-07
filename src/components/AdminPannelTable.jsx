import React, { useState, useEffect } from 'react'
import { MdLocationPin } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import MobileAdminPannel from './MobileAdminPannel';
import { getDatabase, ref, onValue, remove, get } from "firebase/database";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ConfirmDeletion from './ConfirmDeletion';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FiSearch } from "react-icons/fi";
import ExportToExcel from './ExportToExcel';


const AdminPannelTable = ({openMenu, setOpenMenu}) => {

  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerForDeletion, setSelectedCustomerForDeletion] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null); // Track the logged-in user's email
  const [isAdmin, setIsAdmin] = useState(false); // Check if the current user is admin
  const [authUserEmail, setAuthUserEmail] = useState(null); // Store email of the logged-in user
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 10; // Number of items per page

  
  // Handle page navigation
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchCustomers = () => {
        const db = getDatabase();
        const customersRef = ref(db, 'customers');

        onValue(customersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array of customers
                const customerList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));

                setCustomers(customerList);
                setTotalCustomers(customerList.length);
            } else {
                setCustomers([]);
                setTotalCustomers(0);
            }
        }, (error) => {
            console.error("Error fetching customers:", error);
        });
    };

    const fetchUserName = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                  const userData = snapshot.val();
                  setCurrentUserEmail(userData.name || "Value Bazar Admin"); // Use name instead of email
                  setIsAdmin(userData.role === 'Value Bazar Admin'); // Check if the user is admin
              } else {
                  console.warn("No user data found in database.");
                  setCurrentUserEmail("Value Bazar Admin");
                  setIsAdmin(false);
              }
              // Store the logged-in user's email
              setAuthUserEmail(user.email);
          } else {
              setCurrentUserEmail("Guest");
          }
      });
  };

    fetchCustomers();
    fetchUserName();
}, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.locationArea?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.mobileNumber?.includes(searchTerm) ||
    customer.cardNumber?.includes(searchTerm)
  );

  // Calculate total pages
const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

// Get the current page data
const currentData = filteredCustomers.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  const handleDeleteClick = (customer) => {
    // Store the selected customer and navigate to confirmation page
    setSelectedCustomerForDeletion(customer);
    navigate("/confirmCustomerDeletion", { 
      state: { 
        customer: customer,
        securityCode: '313@vb'  // Hardcoded security code as per your requirement
      } 
    });
  };

  return (
    <div className="pt-[100px] md:pt-[150px] md:pl-[50px] flex flex-col justify-center items-center">
      <div className="md:hidden w-full">
        <MobileAdminPannel openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
      <div className=" md:flex justify-between items-center flex-wrap mb-10 w-full pr-5 hidden">
        <Link to="/addCustomers">
          <div className="px-8 py-3 bg-[#00a2ff] rounded-3xl flex justify-center items-center gap-3 font-semibold text-[#fff] cursor-pointer CustomerBox">
            Add Customers{" "}
            <span>
              <FaPlus />
            </span>
          </div>
        </Link>
        <div>
          <ExportToExcel/>
        </div>
        <div className=" px-8 py-3 rounded-lg bg-[#ff9192] flex justify-center items-center CustomerBox">
          <div className="flex flex-col justify-center items-center text-center font-semibold text-[#fff]">
            Number Of Customers
            <span className="text-3xl font-bold">{totalCustomers}</span>
          </div>
        </div>
        <div className=" relative flex justify-center items-center">
          <input
            type="text"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-8 py-3 rounded-3xl border-none outline-none CustomerBox"
          />
          <span className=" absolute right-3">
            <LuSearch />
          </span>
        </div>
      </div>
      {/* Mobile Search Bar */}
      <div className=" relative mb-5 flex justify-center items-center w-[95%] md:hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder="search....."
          className="py-3 pl-4 w-full rounded-lg drop-shadow-md outline-none border-none Background"
        />
        <span className=" absolute right-3 text-xl">
          <FiSearch />
        </span>
      </div>
      <div className="overflow-x-auto w-full mb-5">
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100 text-sm text-nowrap text-center">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">
                Customer Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Card No.</th>
              <th className="border border-gray-300 px-4 py-2">Mobile No.</th>
              <th className="border border-gray-300 px-4 py-2">Place</th>
              <th className="border border-gray-300 px-4 py-2">
                Created by Users
              </th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
             {authUserEmail === "admin@gmail.com" && (
                <>
                  <th className="border border-gray-300 px-4 py-2">Edit</th>
                  <th className="border border-gray-300 px-4 py-2">Delete</th>
                </>
             )}
                
            
            </tr>
          </thead>

          <tbody className="text-center text-sm text-nowrap">
            {currentData.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-4 cursor-pointer text-xl">
                  {customer.location?.googleMapsLink ? (
                    <a
                      href={customer.location.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MdLocationPin />
                    </a>
                  ) : (
                    <MdLocationPin />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.customerName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.cardNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.mobileNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.locationArea}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.createdBy}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
                {authUserEmail ==="admin@gmail.com" &&(
                  <>
                    <Link to="/editCustomer" state={{ customer: customer }}>
                      <td className="border border-gray-300 px-4 py-2 cursor-pointer">
                        <MdModeEditOutline />
                      </td>
                    </Link>
                    <td
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                      onClick={() => handleDeleteClick(customer)}
                    >
                      <MdDelete />
                    </td>
                  </>
                )}
                  
                
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
  <div className="flex justify-between items-center mt-4">
    <button
      onClick={handlePrevious}
      disabled={currentPage === 1}
      className={`px-4 py-2 border border-gray-300 rounded ${
        currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 border border-gray-300 rounded ${
        currentPage === totalPages
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
      </div>
      {/* <ConfirmDeletion/> */}
    </div>
  );
}

export default AdminPannelTable
