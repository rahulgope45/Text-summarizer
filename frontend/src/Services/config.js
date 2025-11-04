export const AUTH_BASE_URL = 
import.meta.env.MODE === "production"
 ? ""
 : "http://localhost:3003/api/auth";


 export const SUMMARY_BASE_URL =
 import.meta.env.MODE === "production"
 ? ""
 : "http://localhost:3003/api"