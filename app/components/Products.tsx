"use client";
import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductType } from "../types/productsTypes";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [likedProducts, setLikedProducts] = useState<ProductType[]>([]);
  const [content, setContent] = useState<string>("products");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      const productsWithLiked = data.map((product: ProductType) => ({
        ...product,
        liked: false,
      }));

      const uniqueCategories = [
        "all",
        ...new Set(productsWithLiked.map((p) => p.category)),
      ];

      setProducts(productsWithLiked);
      setCategories(uniqueCategories);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = (id: number): void => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const toggleLikeProduct = (product: ProductType): void => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, liked: !p.liked } : p
      )
    );
    setLikedProducts((prevLikedProducts) => {
      if (product.liked) {
        return prevLikedProducts.filter((p) => p.id !== product.id);
      } else {
        return [...prevLikedProducts, { ...product, liked: true }];
      }
    });
  };

  const filteredProducts =
    content === "likedProducts"
      ? likedProducts
      : selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="flex flex-col gap-4 items-center m-10 relative min-h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="loader" />
        </div>
      )}
      {!isLoading && !error && (
        <div className="flex gap-4 items-center">
          <select
            className="p-2 border rounded"
            value={content}
            onChange={(e) =>
              setContent(e.target.value as "products" | "likedProducts")
            }
          >
            <option value="products">All Products</option>
            <option value="likedProducts">Liked Products</option>
          </select>
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {!isLoading &&
          filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <Product
              onDelete={deleteProduct}
              onLike={toggleLikeProduct}
              key={product.id}
              product={product}
            />
          ))}

        {!isLoading && filteredProducts.length === 0 && (
          <p className="text-gray-500">No products found</p>
        )}
        {error && <h1 className="text-red-500">{error}</h1>}
      </div>
    </div>
  );
}
