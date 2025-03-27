import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href="/products" className="p-4 bg-blue-600 rounded-lg text-white">
        Products Page
      </Link>
    </div>
  );
}
