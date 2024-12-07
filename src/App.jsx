import AddCustomers from "./components/AddCustomers";
import AdminPannel from "./components/AdminPannel";
import Login from "./components/Login";
import UserCreation from "./components/UserCreation";
import Users from "./components/Users";
import AdminPannelTable from "./components/AdminPannelTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import EditUser from "./components/EditUser";
import EditCustomer from "./components/EditCustomer";
import ConfirmationDeletion2 from "./components/ConfirmationDeletion2";
import ConfirmDeletion from "./components/ConfirmDeletion";

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> {/* Add this */}
          <Route path="/addCustomers" element={<AddCustomers />} />
          <Route path="/adminPannel" element={<AdminPannel />} />
          <Route path="/userCreation" element={<UserCreation />} />
          <Route path="/usersTable" element={<Users />} />
          <Route path="/adminPannelTable" element={<AdminPannelTable />} />
          <Route path="/editUser" element={<EditUser/>}/>
          <Route path="/editCustomer" element={<EditCustomer/>}/>
          <Route path="/confirmDeletion" element={<ConfirmDeletion/>}/>
          <Route path="/confirmCustomerDeletion" element={<ConfirmationDeletion2/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
