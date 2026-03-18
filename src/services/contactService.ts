import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contact';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
}

const sendInquiry = async (contactData: ContactData) => {
  const response = await axios.post(API_URL, contactData);
  return response.data;
};

const contactService = {
  sendInquiry,
};

export default contactService;
