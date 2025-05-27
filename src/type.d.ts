interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating?:{
        rate: number;
        count: number;
    },
    image: string;
}

interface ProductCardProps {
    title: string;
    description: string;
    price: number;
    image: string;
}

interface ProductState {
    products: Product[];
    fetchProducts: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: number, product: Omit<Product, 'id'>) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
  }