import axiosInstance from './axiosInstance';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
}

const sendInquiry = async (contactData: ContactData) => {
  const response = await axiosInstance.post('/contact', contactData);
  return response.data;
};

const contactService = {
  sendInquiry,
};

export default contactService;
