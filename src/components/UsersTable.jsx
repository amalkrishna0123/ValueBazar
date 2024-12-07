import { useEffect, useState } from 'react';
import { onValue, ref, remove} from 'firebase/database';
import { auth, database } from './Firebase'; 
import { onAuthStateChanged,getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { HiPlusSm } from "react-icons/hi";
import MobileNavbarMenus from './MobileNavbarMenus';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditUser from './EditUser';
import ConfirmationDeletion2 from './ConfirmationDeletion2';


const UsersTable = ({ usersMenu, setUsersMenu, toggleMenu2 }) => {
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [adminEmail, setAdminEmail] = useState(null)

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user && user.email === 'admin@gmail.com') {
    //             setIsAdmin(true);
    //             setAdminEmail(user.email)

    //             const usersRef = ref(database, 'users');
    //             onValue(usersRef, (snapshot) => {
    //                 const data = snapshot.val();
                    
    //                     const usersArray = Object.entries(data).map(([id, userData]) => ({
    //                         id,
    //                         ...userData,
    //                     }));
    //                     setUsers(usersArray);
    //             });
    //         }
    //     });

    //     return () => unsubscribe();
    // }, [navigate]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === 'admin@gmail.com') {
                setIsAdmin(true);
                setAdminEmail(user.email); // Only set admin email here
            }
        });
    
        return () => unsubscribe();
    }, [auth]);


    useEffect(() => {
            const usersRef = ref(database, 'users');
            const fetchUsers = onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const usersArray = Object.entries(data).map(([id, userData]) => ({
                        id,
                        ...userData,
                    }));
                    setUsers(usersArray);
                } else {
                    const usersArray = Object.entries(data).map(([id, userData]) => ({
                        id,
                        ...userData,
                    }));
                    setUsers([usersArray]); // Clear users if no data found
                }
            });
    
            return () => fetchUsers(); // Cleanup subscription
        
    }, [adminEmail, database]);

    // if (!isAdmin) {
    //     return null;
    // }

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        // Store the user ID in localStorage to access it in ConfirmDeletion
        localStorage.setItem('userToDelete', userId);
        navigate('/confirmDeletion');
    };

    return (
      <div className="pt-[100px] md:pt-[150px] md:pl-[50px] flex flex-col justify-center items-center">
        <div className="flex justify-between w-full px-2 items-center mb-5">
          <div className="text-center  text-2xl md:text-[30px] font-bold">
            Users List
          </div>
          {adminEmail === "admin@gmail.com" && (
            <Link to="/userCreation">
              <div className="p-1 rounded-full bg-[#f0eeef] font-bold text-3xl drop-shadow-sm cursor-pointer md:hidden">
                <HiPlusSm />
              </div>
            </Link>
          )}
          
          {adminEmail === "admin@gmail.com" && (
            <Link to="/userCreation" className=' hidden md:flex'>
              <div className="flex justify-center items-center gap-2 text-2xl font-semibold rounded-3xl p-2 bg-[#00A2FF] px-8 py-2 text-[#fff]">
                Add User
                <span className="font-bold text-3xl drop-shadow-sm cursor-pointer hidden md:flex">
                  <HiPlusSm />
                </span>
              </div>
            </Link>
          )}
        </div>
        <div className="overflow-x-auto w-full mb-5">
          <table className="table-auto w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-100 text-sm text-nowrap text-center font-bold">
              <tr>
                <th className="border border-gray-300 px-4 py-3">Name</th>
                <th className="border border-gray-300 px-4 py-3">Username</th>
                <th className="border border-gray-300 px-4 py-3">Mobile No.</th>
                <th className="border border-gray-300 px-4 py-3">Status</th>
                <th className="border border-gray-300 px-4 py-3">
                  Created Date
                </th>
                <th className="border border-gray-300 px-4 py-3">User UID</th>
                {adminEmail === "admin@gmail.com" && (
                  <>
                    <th className="border border-gray-300 px-4 py-3">Edit</th>
                    <th className="border border-gray-300 px-4 py-3">Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="text-center text-sm text-nowrap font-semibold">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {user.mobileNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {user.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {user.User_uid}
                  </td>
                  {adminEmail === "admin@gmail.com" && (
                    <>
                      <Link
                        to="/editUser"
                        state={{ userData: user }}
                        onClick={() =>
                          localStorage.setItem(
                            "userToEdit",
                            JSON.stringify(user)
                          )
                        }
                      >
                        <td className="border border-gray-300 px-4 py-3 cursor-pointer">
                          <MdModeEditOutline />
                        </td>
                      </Link>
                      <td className="border border-gray-300 px-4 py-3 cursor-pointer">
                        <MdDelete onClick={() => handleDeleteClick(user.id)} />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {usersMenu && (
          <MobileNavbarMenus
            usersMenu={usersMenu}
            setUsersMenu={setUsersMenu} toggleMenu2={toggleMenu2} 
          />
        )}
        {/* <ConfirmationDeletion2/> */}
      </div>
    );
};

export default UsersTable;
