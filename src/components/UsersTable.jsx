import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { auth, database } from './Firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { HiPlusSm } from "react-icons/hi";
import MobileNavbarMenus from './MobileNavbarMenus';


const UsersTable = ({ usersMenu, setUsersMenu }) => {
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === 'admin@gmail.com') {
                setIsAdmin(true);

                // Fetch users data
                const usersRef = ref(database, 'users');
                onValue(usersRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const usersArray = Object.entries(data).map(([id, userData]) => ({
                            id,
                            ...userData,
                        }));
                        setUsers(usersArray);
                    }
                });
            } else {
                setIsAdmin(false);
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (!isAdmin) {
        return null;
    }

    return (
        <div className='pt-[100px] md:pt-[150px] md:pl-[50px] flex flex-col justify-center items-center'>
            <div className='flex justify-between w-full px-2 items-center mb-5'>
              <div className='text-center  text-2xl md:text-[30px] font-bold'>Users List</div>
              <Link to="/userCreation">
              <div className="p-1 rounded-full bg-[#f0eeef] font-bold text-3xl drop-shadow-sm cursor-pointer">
                <HiPlusSm />
              </div>
              </Link>
            </div>
            <div className='overflow-x-auto w-full'>
                <table className='table-auto w-full border-collapse border border-gray-300 text-center'>
                    <thead className='bg-gray-100 text-sm text-nowrap text-center'>
                        <tr>
                            <th className='border border-gray-300 px-4 py-2'>Name</th>
                            <th className='border border-gray-300 px-4 py-2'>Username</th>
                            <th className='border border-gray-300 px-4 py-2'>Mobile No.</th>
                            <th className='border border-gray-300 px-4 py-2'>Status</th>
                            <th className='border border-gray-300 px-4 py-2'>Created Date</th>
                            <th className='border border-gray-300 px-4 py-2'>User UID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center text-sm text-nowrap'>
                        {users.map((user) => (
                            <tr key={user.id} className='hover:bg-gray-50'>
                                <td className='border border-gray-300 px-4 py-2'>{user.name}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.username}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.mobileNumber}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.status}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>{user.User_uid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {usersMenu && (
              <MobileNavbarMenus usersMenu={usersMenu} setUsersMenu={setUsersMenu}/>
            )}
        </div>
    );
};

export default UsersTable;
