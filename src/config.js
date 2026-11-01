// Base URL of the StayHealthy authentication API (see /server).
// Override it with VITE_API_URL in a .env file when the API runs elsewhere.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';
