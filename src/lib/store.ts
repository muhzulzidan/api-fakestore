import { create } from 'zustand';
import axios from 'axios';


export const useProductStore = create<ProductState>((set) => ({
  products: [],
  fetchProducts: async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    set({ products: res.data });
  },
  addProduct: async (product) => {
    const res = await axios.post('https://fakestoreapi.com/products', product);
    set((state) => ({ products: [...state.products, res.data] }));
  },
  updateProduct: async (id, product) => {
    const res = await axios.put(`https://fakestoreapi.com/products/${id}`, product);
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? res.data : p)),
    }));
  },
  deleteProduct: async (id) => {
    await axios.delete(`https://fakestoreapi.com/products/${id}`);
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
}));
