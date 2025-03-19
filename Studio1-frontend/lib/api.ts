import axios from "axios";

const API_BASE_URL = "https://backend-studio1-1.onrender.com";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhiNjRiMGNmNDI4OGZiYjMwZThiZDkiLCJpYXQiOjE3MzcyODg0ODUsImV4cCI6MTc0NTA2NDQ4NX0.nu9usHteG1S2fCGkd-PFo4pFJmYcMTIt9hV3WFzMFZQ"; // Replace with the actual token

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Automatically add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or get from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Fetch all projects
export const fetchProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
  };
  
  // Fetch a single project by ID
  export const fetchProjectById = async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  };
  
  // Create a new project
  export const createProject = async (data: any) => {
    const response = await api.post("/projects", data);
    return response.data;
  };
  
  // Update a project
  export const updateProject = async (id: string, data: any) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  };
  
  // Delete a project
  export const deleteProject = async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  };