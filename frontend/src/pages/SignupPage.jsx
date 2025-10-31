import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { AUTH_BASE_URL } from '../Services/config';
import axios from 'axios';
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

async function handleSignup(e){
  e.preventDefault();
  try {
    const result = await axios.post(
      `${AUTH_BASE_URL}/signup`,
      {
        fullName: userName,email,password,confirmPassword
      },
      {
        withCredentials:true
      }
    )
    if(result.status === 201){
      toast.success("Signup Success");
      console.log("Signup Success",result.data)
      navigate("/login");
      
    }
  } catch (error) {
    if(error.response && error.response.status === 400){
      toast.error("Email already exists. Please use a different account");
    }else{
      console.log("Signup error",error)
    }

    
  }
}



  return (
    <div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">
          <div className="w-full max-w-md border-4 border-black p-8">
            <h1 className="text-3xl font-bold uppercase tracking-widest border-b-4 border-black pb-2 mb-6">
              Signup to your account
            </h1>
            <div className="mb-6">
              <label className="block text-sm font-bold uppercase mb-2">Name</label>
              <input
                type="text"
                placeholder="EMAIL"
                className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
                onChange={(e) => setUserName(e.target.value) }

              />
            </div>
    
            <div className="mb-6">
              <label className="block text-sm font-bold uppercase mb-2">Email</label>
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
                onChange={(e) => setEmail(e.target.value) }
              />
            </div>
    
            <div className="mb-6">
              <label className="block text-sm font-bold uppercase mb-2">Password</label>
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
                onChange={(e) => setPassword(e.target.value) }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold uppercase mb-2"> Confirm Password</label>
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
                onChange={(e) => setConfirmPassword(e.target.value) }
              />
            </div>
    
            <button 
            onClick={handleSignup}
            className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-none">
              Signup
            </button>
    
            <p className="mt-6 text-sm uppercase font-bold">
              Already have an account?{' '}
              <Link to="/login" className="underline hover:no-underline text-black">
                Login
              </Link>
            </p>
          </div>
        </div>
  )
}

export default SignupPage