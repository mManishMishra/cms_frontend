import axios from "axios";

// initialize axios 
const api = axios.create({
    baseURL: `${process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_DEV_URL : process.env.NEXT_PUBLIC_API_BASE_URL}`,
    // headers: {
    //     common: { 'Authorization': `Bearer ${localStorage.getItem("authToken")}` }
    // },
    withCredentials: true,
    
});

export default api;
