import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories/';

// Transform backend category to match frontend Category interface
const transformCategory = (item: any) => ({
  ...item,
  id: item._id,
  datasetCount: item.datasetCount || 0,
  icon: item.icon || 'Database', // Default icon if none provided
});

// Get all categories
const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data.map(transformCategory);
};

// Create a category
const createCategory = async (categoryData: { name: string; description: string }) => {
  const response = await axios.post(API_URL, categoryData);
  return transformCategory(response.data);
};

// Get single category by ID
const getCategoryById = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return transformCategory(response.data);
};

// Update a category
const updateCategory = async (id: string, categoryData: { name?: string; description?: string }) => {
  const response = await axios.put(API_URL + id, categoryData);
  return transformCategory(response.data);
};

// Delete a category
const deleteCategory = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

export default categoryService;
