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

  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(
        data.map((product: ProductType) => ({ ...product, liked: false }))
      );
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

  return (
    <div className="flex flex-col gap-4 items-center m-10">
      {!isLoading && !error && (
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
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {!isLoading &&
          content === "products" &&
          products.length > 0 &&
          products.map((product) => (
            <Product
              onDelete={deleteProduct}
              onLike={toggleLikeProduct}
              key={product.id}
              product={product}
            />
          ))}
        {!isLoading &&
          content === "likedProducts" &&
          products.length > 0 &&
          likedProducts?.map((product) => (
            <Product
              onDelete={deleteProduct}
              onLike={toggleLikeProduct}
              key={product.id}
              product={product}
            />
          ))}
        {error && <h1>{error}</h1>}
      </div>
    </div>
  );
}
