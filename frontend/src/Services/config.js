export const AUTH_BASE_URL = 
import.meta.env.MODE === "production"
 ? ""
 : "https://text-summarizer-1-gadp.onrender.com/api/auth";


 export const SUMMARY_BASE_URL =
 import.meta.env.MODE === "production"
 ? "https://text-summarizer-1-gadp.onrender.com/api"
 : "http://localhost:3002/api"