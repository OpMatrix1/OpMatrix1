import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const auth = JSON.parse(localStorage.getItem('auth') || 'null');
    if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
});

export const AuthService = {
    login: async (username, password) => {
        const response = await api.post('/users/login', { username, password });
        return response.data;
    },
    
    register: async (username, password, email) => {
        const response = await api.post('/users/register', { username, password, email });
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/users/me');
        return response.data;
    }
};

export const PapersService = {
    getAllPapers: async () => {
        const response = await api.get('/papers');
        return response.data;
    },

    getPapersByCourse: async (courseCode) => {
        const response = await api.get(`/papers/${courseCode}`);
        return response.data;
    },

    uploadPaper: async (formData) => {
        const response = await api.post('/papers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};

export const CoursesService = {
    getAllCourses: async () => {
        const response = await api.get('/courses');
        return response.data;
    },

    getCourse: async (code) => {
        const response = await api.get(`/courses/${code}`);
        return response.data;
    }
};

export default api;
