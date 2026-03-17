import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data/';

// Transform backend data to match frontend Dataset interface
const transformDataset = (item: any) => {
  if (!item) return null;
  
  return {
    ...item,
    id: item._id,
    title: item.name,
    // Safely handle category population
    industry: (item.category && typeof item.category === 'object') 
      ? item.category.name 
      : 'B2B Data',
    contactCount: item.totalRecords || 0,
    lastUpdated: item.updatedAt ? new Date(item.updatedAt).toISOString().split('T')[0] : '2024-01-01',
    // Ensure fields exist for the UI
    fields: item.fields || ['Name', 'Phone', 'Email', 'Location', 'Price'],
  };
};

// Get all data items
const getAllData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map(transformDataset).filter(Boolean);
  } catch (error) {
    console.error('API Error in getAllData:', error);
    return [];
  }
};

// Get data items by category
const getDataByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(API_URL + 'category/' + categoryId);
    return response.data.map(transformDataset).filter(Boolean);
  } catch (error) {
    console.error('API Error in getDataByCategory:', error);
    return [];
  }
};

// Create a data item
const createData = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return transformDataset(response.data);
};

// Get single data item by ID
const getDataById = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return transformDataset(response.data);
};

// Update a data item
const updateData = async (id: string, data: any) => {
  const response = await axios.put(API_URL + id, data);
  return transformDataset(response.data);
};

// Delete a data item
const deleteData = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const dataService = {
  getAllData,
  getDataByCategory,
  createData,
  getDataById,
  updateData,
  deleteData,
};

export default dataService;
