import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div>
        <div>
            Login to your Account
            
            <div>
                <p>Email</p>
                <input
                type='email'
                placeholder='Enter Your Password'
                />
            </div>
            <div>
                <p>Password</p>
                <input
                type='password'
                placeholder='Enter Your Password'
                />
                
            </div>
            

           <p>Don't have an account? <Link to="/signup" className="hover:text-blue-500">Register</Link></p>

        </div>
    </div>
  )
}

export default LoginPage