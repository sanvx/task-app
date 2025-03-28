"use client";

import { use } from "react";
import Link from "next/link";

import ProductForm from "@/app/components/Products/ProductForm";
import { useAppSelector } from "../../store/hooks";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { products } = useAppSelector((state) => state.products);
  const product = products.find((product) => product.id === Number(slug));

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center space-y-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-700 font-medium">
            Product does not exist
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            The requested product does not exist.
          </h2>
          
          <p className="text-gray-600">
            Please select one from the products page.
          </p>
          
          <Link 
            href="/products" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Go to Products Page
          </Link>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div>
      <ProductForm formType="edit" initialData={product} />
    </div>
  );
}
