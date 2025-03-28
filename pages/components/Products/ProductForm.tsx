"use client";

import React, { useState} from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/pages/store/hooks';
import { ProductType } from '@/pages/types/productsTypes';

const addProduct = (product: ProductType) => ({
  type: 'products/addProduct',
  payload: {
    ...product,
    liked: false
  }
});

const updateProduct = (product: ProductType) => ({
  type: 'products/updateProduct',
  payload: product
});

interface ProductFormProps {
  initialData?: ProductType;
  formType: 'add' | 'edit';
}

export default function ProductForm({ initialData, formType }: ProductFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [formData, setFormData] = useState<ProductType>({
    id: initialData?.id || Date.now(),
    title: initialData?.title || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    category: initialData?.category || '',
    image: initialData?.image || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (formType === 'add') {
      dispatch(addProduct(formData));
    } else {
      dispatch(updateProduct(formData));
    }

    router.push("/products");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {formType === 'add' ? 'Add New Product' : 'Edit Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            required
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {formType === 'add' ? 'Add Product' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}