import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { AUTH_BASE_URL } from '../Services/config';
import axios from 'axios';
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] =useState("");
const[loading, setLoading] = useState("");

async function handleLogin(e) {

  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(

      `${AUTH_BASE_URL}/login`,
      {email,password},
      {withCredentials:true} 

    );

    if(res.status === 200){
      toast.success("Login Succesfully");
      console.log("User data", res.data)
      navigate("/");
    }
  } catch (error) {
    console.error("Login error", error);

    if(error.response.status === 401){
      toast.error("Invalid Credentials. Please try Again")
    } else{
      toast.error("Network Error. Please check your connection");
    }
    
  }finally{
    setLoading(false);
  }
  
}




  return (
    <div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">
      <div className="w-full max-w-md border-4 border-black p-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest border-b-4 border-black pb-2 mb-6">
          Login to your account
        </h1>

        <form onSubmit={handleLogin}>


        <div className="mb-6">
          <label className="block text-sm font-bold uppercase mb-2">Email</label>
          <input
          onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="EMAIL"
            className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold uppercase mb-2">Password</label>
          <input
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="PASSWORD"
            className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
          />
        </div>

        <button 
        type='submit'
        disabled={loading}
        className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-none">
          {loading ? "Logging in..." : "Login"}
        </button>

        </form>

        <p className="mt-6 text-sm uppercase font-bold">
          Don't have an account?{' '}
          <Link to="/signup" className="underline hover:no-underline text-black">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
