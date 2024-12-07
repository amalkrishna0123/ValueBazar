import React,{useState, useEffect} from "react";
import AddCustomers from "./components/AddCustomers";
import AdminPannel from "./components/AdminPannel";
import Login from "./components/Login";
import UserCreation from "./components/UserCreation";
import Users from "./components/Users";
import AdminPannelTable from "./components/AdminPannelTable";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import EditUser from "./components/EditUser";
import EditCustomer from "./components/EditCustomer";
import ConfirmationDeletion2 from "./components/ConfirmationDeletion2";
import ConfirmDeletion from "./components/ConfirmDeletion";
import { auth } from "./components/Firebase"
import PageNotFound from "./components/PageNotFound";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

   // Firebase authentication state listener
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pageNotFound" element={<PageNotFound/>}/>
          <Route path="/addCustomers" element={<ProtectedRoute element={<AddCustomers />} />}  />
          <Route path="/adminPannel" element={<ProtectedRoute element={<AdminPannel />} />}  />
          <Route path="/userCreation" element={<ProtectedRoute element={<UserCreation />} />} />
          <Route path="/usersTable" element={<ProtectedRoute element={<Users />}/>}  />
          <Route path="/adminPannelTable" element={<ProtectedRoute element={<AdminPannelTable />}/>}  />
          <Route path="/editUser" element={<ProtectedRoute element={<EditUser/>}/>} />
          <Route path="/editCustomer" element={<ProtectedRoute element={<EditCustomer/>}/>} />
          <Route path="/confirmDeletion" element={<ProtectedRoute element={<ConfirmDeletion/>}/>} />
          <Route path="/confirmCustomerDeletion" element={<ProtectedRoute element={<ConfirmationDeletion2/>}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
