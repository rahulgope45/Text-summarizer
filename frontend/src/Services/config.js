// Get the backend URL based on environment
const getBackendURL = () => {
  // If running in production (Vercel), use Render backend
  if (import.meta.env.PROD) {
    return "https://text-summarizer-1-gadp.onrender.com";
  }
  // If running locally, use localhost
  return "http://localhost:3002";
};

const BACKEND_URL = getBackendURL();

export const AUTH_BASE_URL = `${BACKEND_URL}/api/auth`;
export const SUMMARY_BASE_URL = `${BACKEND_URL}/api`;

// For debugging
console.log('Backend URL:', BACKEND_URL);
console.log('Auth Base URL:', AUTH_BASE_URL);
console.log('Summary Base URL:', SUMMARY_BASE_URL);