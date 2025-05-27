
import { useEffect, useState } from 'react';
import Card from './components/card';
import { useProductStore } from './lib/store';

export default function App() {
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    title: '',
    description: '',
    price: 0,
    image: '',
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      await updateProduct(editId, form);
      setEditId(null);
    } else {
      await addProduct(form);
    }
    setForm({ title: '', description: '', price: 0, image: '' });
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id!);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
  };

  // console.log(products, "products")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-gray-900 py-8 px-2 md:px-0">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Product Manager</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="flex gap-2">
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="input border-2 input-bordered border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="input input-bordered border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 border-2 focus:ring-blue-400" />
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required className="input input-bordered border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 border-2 focus:ring-blue-400" />
            <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required className="input input-bordered border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 border-2 focus:ring-blue-400" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className={`px-4 py-2 rounded font-semibold text-white ${editId !== null ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}>{editId !== null ? 'Update Product' : 'Add Product'}</button>
            {editId !== null && (
              <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', price: 0, image: '' }); }} className="px-4 py-2 rounded font-semibold text-white bg-gray-400 hover:bg-gray-500">Cancel</button>
            )}
          </div>
        </form>

        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        {products.length === 0 && <p className="text-center text-gray-500">No products found.</p>}
        <div className="space-y-6">
          {products.map((item) => (
            <div key={item.id} className="relative bg-gray-50 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
              <Card title={item.title} description={item.description}  price={item.price} image={item.image} />
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(item)} className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white font-semibold">Edit</button>
                <button onClick={() => handleDelete(item.id!)} className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-semibold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
