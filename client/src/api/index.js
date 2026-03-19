import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000, // 10 seconds timeout
});

API.interceptors.request.use((req) => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user && user.token) {
                req.headers.Authorization = `Bearer ${user.token}`;
            }
        }
    } catch (error) {
        console.error('Error in request interceptor:', error);
    }
    return req;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized - clear storage and redirect to login
            localStorage.removeItem('userInfo');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const login = (email, password) => API.post('/users/login', { email, password });
export const register = (userData) => API.post('/users/register', userData);
export const getEmployees = () => API.get('/users/employees');

export const createTask = (taskData) => API.post('/tasks', taskData);
export const getTasks = () => API.get('/tasks');
export const getMyTasks = () => API.get('/tasks/my-tasks');
export const updateTaskStatus = (id, status) => API.put(`/tasks/${id}`, { status });

export default API;
