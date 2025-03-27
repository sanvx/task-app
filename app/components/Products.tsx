"use client";

import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductType } from "../types/productsTypes";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && error && <h1>{error}</h1>}
      {!isLoading && !error && products.length > 0
        ? products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        : !isLoading && !error && <h1>No products found</h1>}
    </div>
  );
}
