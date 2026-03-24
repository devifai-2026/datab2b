import axiosInstance from './axiosInstance';

// Transform backend category to match frontend Category interface
const transformCategory = (item: any) => ({
  ...item,
  id: item._id,
  datasetCount: item.datasetCount || 0,
  icon: item.icon || 'Database', // Default icon if none provided
});

// Get all categories
const getCategories = async () => {
  const response = await axiosInstance.get('/categories/');
  return response.data.map(transformCategory);
};

// Create a category
const createCategory = async (categoryData: { name: string; description: string }) => {
  const response = await axiosInstance.post('/categories/', categoryData);
  return transformCategory(response.data);
};

// Get single category by ID
const getCategoryById = async (id: string) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return transformCategory(response.data);
};

// Update a category
const updateCategory = async (id: string, categoryData: { name?: string; description?: string }) => {
  const response = await axiosInstance.put(`/categories/${id}`, categoryData);
  return transformCategory(response.data);
};

// Delete a category
const deleteCategory = async (id: string) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
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
