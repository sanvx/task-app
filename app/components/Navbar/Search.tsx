"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { useAppSelector } from "../../store/hooks";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export default function Search() {
  const [input, setInput] = useState<string>("");
  const { ref, isOpen, setIsOpen } = useOutsideClick();
  const { products } = useAppSelector((state) => state.products);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = input
    ? products
        .filter((product) =>
          product.title.toLowerCase().includes(input.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef} className="relative w-60 md:w-96">
      <div className="relative">
        <input
          type="text"
          name="search"
          className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          placeholder="Search products..."
          value={input}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
          }}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && input && filteredProducts.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0.5 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0.5 }}
            className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          >
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0 border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-blue-600">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && input && filteredProducts.length === 0 && (
        <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4 text-center text-gray-500">No products found</div>
        </div>
      )}
    </div>
  );
}
