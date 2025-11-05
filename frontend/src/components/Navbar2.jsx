import React, { useState, useEffect } from 'react'
import menu from '/Menu.png'
import account3 from '/usericon.png'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../Services/api' // Use the axios instance
import { AUTH_BASE_URL } from '../Services/config'

function Navbar2() {
  const [isOpen, setIsOpen] = useState(false)
  const [User, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          return;
        }

        const res = await api.get(`/api/auth/me`);
        setUser(res.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
        localStorage.removeItem('token'); // Clear invalid token
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }

  return (
    <div className="bg-white text-black font-mono border-b-4 border-black px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left - Menu */}
      <img
        src={menu}
        alt="menu"
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 cursor-pointer border-2 border-black"
      />

      {/* Center - Logo */}
      <p className="text-3xl font-bold uppercase tracking-widest text-blue-900">
        Text-Short
      </p>

      {/* Right - Account */}
      <div className="flex items-center gap-2">
        {User && <span className="text-sm">{User.email}</span>}
        <img
          src={account3}
          alt="account"
          className="w-10 h-10 border-2 border-black object-cover"
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r-4 border-black transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-none z-50`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          ✕
        </button>

        <nav className="flex flex-col mt-16 space-y-4 px-6 text-black font-bold uppercase text-sm">
          <NavLink to="/quiz" className="border-b-2 border-black pb-1">
            About Us
          </NavLink>
          {User ? (
            <button
              onClick={handleLogout}
              className="text-left border-t-2 border-black pt-2 text-red-600"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/signup" className="cursor-pointer">
              Signup / Login
            </NavLink>
          )}
        </nav>
      </div>

      {/* Transparent click-to-close overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default Navbar2