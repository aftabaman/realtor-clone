import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
 
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }

  return (
    <section >
      {/* added this div to align the sign-in contents */}
      <div className='flex flex-col justify-center items-center'>

        <h1 className='text-3xl text-center mt-6 font-bold '>SIGN IN</h1>
        {/* added full with to properly maintain the responsiveness  */}
        <div className='flex justify-center flex-wrap items-center px-6 py-11 max-w-6xl w-full'>
          <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
            <img src="./public/login-img.png" alt='key' className='w-full rounded-2xl ' />
          </div>
          <div className=' w-full md:w-[67%] lg:w-[40%] lg:mt-20 mx-7 lg:ml-20'>
            <form onSubmit={onSubmit}>
              <input className='mb-6 w-full px-4  py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="email" id='email' value={email} onChange={onChange} placeholder='Email Address' />

              <div className="relative mb-6">
                <input className='w-full px-4  py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword ? "text" : "password"} id='password' value={password} onChange={onChange} placeholder='Enter Password' />

                {showPassword ? (
                  <AiFillEyeInvisible
                    className="absolute right-3 top-3 text-xl cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <AiFillEye
                    className="absolute right-3 top-3 text-xl cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>
              <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                <p className='mb-6'>Don't have an account?
                  <Link to="/sign-up" className='text-red-500 hover:text-red-700 transition  duration-200 ease-in-out ml-1'>Register</Link>

                </p>
                <p>
                  <Link className='text-blue-500 hover:text-blue-800 transition  duration-200 ease-in-out' to="/forgot-password"> Forgot Password?</Link>
                </p>
              </div>
              <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Sign In</button>

              <div className='my-4 items-center  before:border-t flex before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300 '>
                <p className='text-center font-semibold mx-4'>OR</p>
              </div>
              <OAuth />
            </form>
          </div>
        </div>
      </div>
        
    </section>
  )
}

export default Signin