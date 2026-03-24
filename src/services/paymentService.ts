import axiosInstance from './axiosInstance';

const createOrder = async (amount: number, currency: string = 'INR') => {
  const response = await axiosInstance.post('/payment/order', { amount, currency });
  return response.data;
};

const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  userId?: string;
  productId?: string;
  productName?: string;
  amount?: number;
  currency?: string;
  quantity?: number;
}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axiosInstance.post('/payment/verify', paymentData, config);
  return response.data;
};

const paymentService = {
  createOrder,
  verifyPayment,
};

export default paymentService;
