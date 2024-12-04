import AddCustomers from "./components/AddCustomers";
import AdminPannel from "./components/AdminPannel";
import Login from "./components/Login";
import UserCreation from "./components/UserCreation";
import Users from "./components/Users";
import AdminPannelTable from "./components/AdminPannelTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* Add this */}
        <Route path="/addCustomers" element={<AddCustomers />} />
        <Route path="/adminPannel" element={<AdminPannel />} />
        <Route path="/userCreation" element={<UserCreation />} />
        <Route path="/usersTable" element={<Users />} />
        <Route path="/adminPannelTable" element={<AdminPannelTable />} />
      </Routes>
    </Router>
  );
}

export default App;
