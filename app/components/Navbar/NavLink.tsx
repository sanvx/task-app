"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const path = usePathname();

  return (
    <Link className="relative block" href={href}>
      {children}
      {path === href && (
        <motion.div
          layoutId="underline"
          className="absolute border-b-2 border-blue-500 w-1/2"
        />
      )}
    </Link>
  );
}