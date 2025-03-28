"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ProductType } from "../../types/productsTypes";

interface ProductProps {
  product: ProductType;
  onDelete: (id: number) => void;
  onLike: (product: ProductType) => void;
}

export default function Product({ product, onLike, onDelete }: ProductProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="w-72 min-h-[350px] flex flex-col gap-4 items-center p-4 rounded-md shadow-md hover:shadow-lg transition bg-white"
    >
      <div className="relative w-[150px] h-[200px] flex items-center justify-center">
        <Image
          src={product.image}
          alt={`Image of ${product.title}`}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center justify-between flex-grow gap-2 text-center w-full">
        <p className="font-medium line-clamp-2 px-2">{product.title}</p>
        <div className="flex items-center justify-between w-full justify-self-end">
          <p className="font-semibold text-green-600">${product.price}</p>
          <div className="flex gap-1 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(product.id);
              }}
              className="bg-red-500 rounded-md cursor-pointer text-white p-1.5 z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onLike(product);
              }}
              className="bg-blue-500 rounded-md cursor-pointer text-white p-1.5 z-50"
            >
              {product.liked ? (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
}