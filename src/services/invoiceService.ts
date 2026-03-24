import axiosInstance from './axiosInstance';

const getMyInvoices = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axiosInstance.get('/invoices/my', config);
  return response.data;
};

const cancelInvoice = async (invoiceId: string) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axiosInstance.put(`/invoices/${invoiceId}/cancel`, {}, config);
  return response.data;
};

const downloadInvoice = async (invoiceId: string, fileName: string = 'invoice.pdf') => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    responseType: 'blob' as const,
  };
  const response = await axiosInstance.get(`/invoices/${invoiceId}/download`, config);
  
  // Create a local URL for the blob and trigger download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const invoiceService = {
  getMyInvoices,
  cancelInvoice,
  downloadInvoice,
};

export default invoiceService;
