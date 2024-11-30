import AddCustomers from "./components/AddCustomers";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/addCustomers" element={<AddCustomers />}/>
      </Routes>
    </Router>
  );
}

export default App;
