"use client";
import { useState, useEffect } from "react";
import Product from "./Product";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  fetchProducts,
  deleteProduct,
  toggleLike
} from "../../store/slices/productsSlice";
import { ProductType } from "../../types/productsTypes";
import Link from "next/link";

export default function Products() {
  const dispatch = useAppDispatch();
  const {
    products,
    likedProducts,
    loading: isLoading,
    error
  } = useAppSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const [content, setContent] = useState<string>("products");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category))
  ];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleToggleLike = (product: ProductType) => {
    dispatch(toggleLike(product));
  };

  const filteredProducts =
    content === "likedProducts"
      ? likedProducts
      : selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct, 
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-4 items-center m-10 relative min-h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="loader" />
        </div>
      )}
      {!isLoading && !error && (
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="p-2 border rounded"
            value={content}
            onChange={(e) => {
              setContent(e.target.value as "products" | "likedProducts");
              setCurrentPage(1); // Reset to first page when changing content
            }}
          >
            <option value="products">All Products</option>
            <option value="likedProducts">Liked Products</option>
          </select>
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // Reset to first page when changing category
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Link href="/add-product" className="text-green-700">
            Add Product
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        {!isLoading &&
          currentProducts.length > 0 &&
          currentProducts.map((product) => (
            <Product
              onDelete={handleDeleteProduct}
              onLike={handleToggleLike}
              key={product.id}
              product={product}
            />
          ))}
        {!isLoading && currentProducts.length === 0 && (
          <p className="text-gray-500">No products found</p>
        )}
        {error && <h1 className="text-red-500">{error}</h1>}
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer disabled:cursor-default px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`cursor-pointer disabled:cursor-default px-4 py-2 border rounded ${
                currentPage === index + 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer disabled:cursor-default px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}