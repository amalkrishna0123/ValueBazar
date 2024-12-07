import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgimage.jpg";
import blackShade from "../assets/blackshade.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const UserCreation = () => {

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    mobileNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the current auth instance
      const auth = getAuth();
      const db = getDatabase();
      
      // Store the current admin user
      const adminUser = auth.currentUser;
      
      // Create new user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.username,
        formData.password
      );
      
      // Store additional user data in Realtime Database
      const userData = {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        mobileNumber: formData.mobileNumber,
        status: "disabled",
        created_at: new Date().toISOString(),
        User_uid: userCredential.user.uid
      };
      
      // Set user data in database
      await set(ref(db, `users/${userCredential.user.uid}`), userData);
      
      // Re-authenticate as admin if needed
      if (adminUser && adminUser.email === 'admin@gmail.com') {
        await auth.updateCurrentUser(adminUser);
      }
      
      // Reset form
      setFormData({
        name: "",
        username: "",
        password: "",
        mobileNumber: ""
      });

      // Navigate back to users table
      navigate("/usersTable");
      
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center md:h-screen py-2 md:py-5 overflow-hidden backdrop-blur-3xl px-2">
      <div className="flex justify-center items-center max-w-[900px] w-full md:h-[600px] h-[700px] bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow">
        <div className="absolute w-full h-full">
          <img src={bgImage} className="w-full h-full object-cover" alt="" />
        </div>
        <div className=" absolute w-full h-full backdrop-blur-sm">
          <img
            src={blackShade}
            className="w-full h-full object-cover absolute"
            alt=""
          />
        </div>
        {/* Contents */}
        <div className="w-full px-4">
          {/* Logo */}
          <div className="mb-20 md:mb-0">
            <div className="h-[100px] absolute z-10 top-5 left-20">
              <img src={logo} className="w-full h-full object-contain" alt="" />
            </div>
          </div>
          {/* Add Customers */}
          <div className="relative w-full px-2 md:px-16 flex flex-col justify-center gap-2 mb-10 text-[#fff]">

          <form onSubmit={handleSubmit}>
            <div className="text-[#fff] relative mb-2 md:mb-10 text-center md:text-[40px] text-[30px] font-semibold">
              Add Users
            </div>
            
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            
            <div className="relative w-full px-2 md:px-16 flex flex-col justify-center gap-2 mb-10 text-[#fff]">
              <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                  Username
                </span>
                <input
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                  required
                />
              </div>

              <div className="grid place-items-center md:flex items-center gap-2 md:gap-10">
                <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 place-items-center md:flex items-center gap-2 md:gap-10">
                <span className="md:text-2xl text-lg whitespace-nowrap flex justify-start md:w-1/4">
                  Mobile Number
                </span>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="border-none outline-none py-3 px-4 rounded-3xl w-full md:w-3/4 text-[#000]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-5 relative">
              <Link to="/usersTable">
                <button type="button" className="px-8 py-2 rounded-3xl bg-[#fff] text-[#000000] font-semibold">
                  Back
                </button>
              </Link>
              <button type="submit" className="px-8 py-2 rounded-3xl bg-[#fff] text-[#000] font-semibold">
                Submit
              </button>
            </div>
          </form>

          </div>

          {/* <div className="flex justify-center items-center gap-5 relative">
            <Link to="/usersTable">
              <button className="px-8 py-2 rounded-3xl bg-[#fff] text-[#000000] font-semibold">
                Back
              </button>
            </Link>
            <button className="px-8 py-2 rounded-3xl bg-[#fff] text-[#00000] font-semibold">
              Submit
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserCreation;
