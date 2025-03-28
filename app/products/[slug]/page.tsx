"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { useAppSelector } from "@/app/store/hooks";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { products } = useAppSelector((state) => state.products);

  const { slug } = use(params);

  const product = products.find((item) => item.id === Number(slug));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{scale: 1, opacity: 1}}
        className="max-w-5xl w-full bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-green-600 mr-4">
              ${product.price.toFixed(2)}
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex space-x-4">
            <Link
              href={`/edit-product/${product.id}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// export default async function ProductPage({ params }: { params: { slug: string } }) {
//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${params.slug}`);

//     if (!response.ok) {
//       throw new Error('Failed to fetch product');
//     }

//     const product = await response.json();

//     return (
// <div className="min-h-screen w-full flex items-center justify-center p-6">
//   <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
//     <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-300"
//       />
//     </div>

//     <div className="md:w-1/2 p-8 flex flex-col justify-center">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>

//       <div className="flex items-center mb-4">
//         <span className="text-2xl font-semibold text-green-600 mr-4">${product.price.toFixed(2)}</span>
//         <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
//           {product.category}
//         </span>
//       </div>

//       <p className="text-gray-600 mb-6 leading-relaxed">
//         {product.description}
//       </p>

//       <div className="flex space-x-4">
//         <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//           Add to Cart
//         </button>
//         <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
//           Wishlist
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
//     );
//   } catch (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-600">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-4">Oops!</h1>
//           <p className="text-xl">Failed to load product details</p>
//         </div>
//       </div>
//     );
//   }
// }
