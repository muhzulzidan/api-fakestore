import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (id: number, product: Omit<Product, 'id'>): Promise<Product> => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
