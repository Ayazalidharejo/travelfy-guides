import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
// const API_BASE_URL = 'https://tour-backend-eight.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls

export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

   forgotPassword: async (email: string) => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },
  
  register: async (userData: { name: string; email: string; password: string; phone?: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    const response = await api.put('/auth/updatedetails', userData);
    return response.data;
  },
  
  updatePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
    const response = await api.put('/auth/updatepassword', passwords);
    return response.data;
  },
  // Existing authAPI object me ye add karein
uploadAvatar: async (formData: FormData) => {
  const response = await api.post('/avatar/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
},

deleteAvatar: async () => {
  const response = await api.delete('/avatar/delete');
  return response.data;
},
};

// Posts API calls
export const postsAPI = {
  getPosts: async (params?: any) => {
    const response = await api.get('/posts', { params });
    return response.data;
  },
  
  getPost: async (id: string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  
  createPost: async (postData: any) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },
  
  updatePost: async (id: string, postData: any) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },
  
  deletePost: async (id: string) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
  
  addReview: async (id: string, review: { rating: number; comment: string }) => {
    const response = await api.post(`/posts/${id}/reviews`, review);
    return response.data;
  },
};

// Bookings API calls
export const bookingsAPI = {
  createBooking: async (bookingData: any) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  
  getMyBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  },
  
  getBooking: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  
  cancelBooking: async (id: string, reason?: string) => {
    const response = await api.put(`/bookings/${id}/cancel`, { reason });
    return response.data;
  },
};

// Admin API calls
export const adminAPI = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  
  getBookings: async () => {
    const response = await api.get('/admin/bookings');
    return response.data;
  },
  
  updateBookingStatus: async (id: string, status: string) => {
    const response = await api.put(`/admin/bookings/${id}`, { status });
    return response.data;
  },
  
  togglePostFeatured: async (id: string, featured: boolean) => {
    const response = await api.put(`/admin/posts/${id}/feature`, { featured });
    return response.data;
  },
  
  adminLogin: async (adminKey: string) => {
    const response = await api.post('/admin/login', { adminKey });
    return response.data;
  },
  
};

// Upload API calls
export const uploadAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  uploadMultipleImages: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    const response = await api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default api;