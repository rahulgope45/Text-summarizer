import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AUTH_BASE_URL } from "../Services/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(`${AUTH_BASE_URL}/check`, {}, { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginUser = (userData) =>{
    setUser(userData);
  }

  const logoutUser = async () =>{
    try {
        await axios.post(`${AUTH_BASE_URL}/logout`,{},{
            withCredentials:true
        })
        
    } catch (error) {
        console.error("Logout error:", err);
    }finally{
        setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser , loginUser ,logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
