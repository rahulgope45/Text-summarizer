import React from 'react'
import { Link } from 'react-router-dom'

function SignupPage() {
  return (
    <div>
        <div>
            Create a New Account
            <div>
                <p>Your FullName</p>
                <input
                type='text'
                placeholder='Enter Your Password'
                />
            </div>
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
            <div>
                <p>Confirm Password</p>
                <input
                type='password'
                placeholder='Enter Your Password'
                />
            </div>

           <p>Already have an account? <Link to="/login" className="hover:text-blue-500">Login</Link></p>

        </div>
    </div>
  )
}

export default SignupPage