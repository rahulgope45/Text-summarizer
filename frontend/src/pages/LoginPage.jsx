import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">
      <div className="w-full max-w-md border-4 border-black p-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest border-b-4 border-black pb-2 mb-6">
          Login to your account
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-bold uppercase mb-2">Email</label>
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold uppercase mb-2">Password</label>
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full border-2 border-black bg-transparent p-2 text-black placeholder-black focus:outline-none focus:bg-black focus:text-white"
          />
        </div>

        <button className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-none">
          Login
        </button>

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
