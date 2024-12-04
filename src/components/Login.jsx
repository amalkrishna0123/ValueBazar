import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/bgimage.jpg";
import blackShade from "../assets/blackshade.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Check if the user is admin
      if (userCredential.user.email === 'admin@gmail.com') {
        navigate('/adminPannel');
      } else {
        // Regular user login - you can add specific routing for regular users
        navigate('/adminPannel'); // Or wherever regular users should go
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Failed to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen overflow-hidden w-full px-2 backdrop-blur-3xl'>
      <div className='flex justify-center items-center max-w-[900px] w-full md:h-[500px] h-[650px] bg-[#000] rounded-[60px] relative overflow-hidden backdrop-blur-3xl border-[#fff] border Boxshadow'>
        <div className='absolute w-full h-full'>
          <img src={bgImage} className='w-full h-full object-cover' alt="" />
        </div>
        <div className='absolute w-full h-full backdrop-blur-sm'>
          <img src={blackShade} className='w-full h-full object-cover absolute' alt="" />
        </div>
        <div className='grid grid-cols-1 place-items-center md:flex justify-between items-center w-full'>
          {/* Left - Logo */}
          <div className='w-[50%] flex justify-center items-center'>
            <div className='relative z-10 h-[300px]'>
              <img src={logo} className='h-full w-full object-contain' alt="" />
            </div>
          </div>
          {/* Right - Login */}
          <div className='relative z-10 md:w-[50%] flex flex-col justify-center items-center w-full'>
            <div className='text-[#fff8f2] mb-10 text-[32px] font-bold pl-4'>Login</div>
            
            {/* Error Message */}
            {error && (
              <div className='text-red-500 mb-4 text-center px-4'>
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className='flex flex-col justify-center items-center gap-5 w-full px-4'>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full outline-none border-none bg-[#fff8f2] rounded-3xl py-3 md:py-2 px-4'
                required
              />
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full outline-none border-none bg-[#fff8f2] rounded-3xl py-3 md:py-2 px-4'
                required
              />
              <div className='flex gap-4'>
                <button
                  type="submit"
                  disabled={loading}
                  className='rounded-3xl py-2 px-8 bg-[#fff8f2] font-semibold disabled:opacity-70'
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
