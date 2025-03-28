import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-4 h-screen items-center justify-center">
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
      >
        Go to Products Page
      </Link>
      <Link
        href="/add-product"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
      >
        Create new product
      </Link>
    </div>
  );
}
