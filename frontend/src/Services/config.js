export const AUTH_BASE_URL = 
import.meta.env.MODE === "production"
 ? ""
 : "http://localhost:3002/api/auth";