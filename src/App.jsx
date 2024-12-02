import AddCustomers from "./components/AddCustomers";
import AdminPannel from "./components/AdminPannel";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCreation from "./components/UserCreation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/addCustomers" element={<AddCustomers />}/>
        <Route path="/adminPannel" element={<AdminPannel/>}/>
        <Route path="/userCreation" element={<UserCreation/>}/>
      </Routes>
    </Router>
  );
}

export default App;
