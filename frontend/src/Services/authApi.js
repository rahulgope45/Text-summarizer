import axios from "axios";
import { AUTH_BASE_URL } from "./config";

axios.defaults.withCredentials = true;
export const loginUser = async (email, password)=>{
    const res = await axios.post(`${AUTH_BASE_URL}/login`,{
        email,password
    });
    return res.data;
};


