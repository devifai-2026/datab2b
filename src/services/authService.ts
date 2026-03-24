import axiosInstance from './axiosInstance';

// Register user
const register = async (userData: any) => {
  const response = await axiosInstance.post('/auth/register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData: any) => {
  const response = await axiosInstance.post('/auth/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Forgot password
const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

// Verify OTP
const verifyOTP = async (email: string, otp: string) => {
  const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
  return response.data;
};

// Reset password
const resetPassword = async (userData: any) => {
  const response = await axiosInstance.post('/auth/reset-password', userData);
  return response.data;
};

// Update user profile
const updateProfile = async (userData: any) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axiosInstance.put('/auth/profile', userData, config);

  if (response.data) {
    // Maintain token if it wasn't returned or keep the old one
    const updatedUser = { ...response.data };
    if (!updatedUser.token) updatedUser.token = user.token;
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateProfile,
};

export default authService;
