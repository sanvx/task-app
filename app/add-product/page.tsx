"use client";

import ProductForm from '@/app/components/Products/ProductForm';

export default function AddProductPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Add New Product</h1>
      <ProductForm formType="add" />
    </div>
  );
}