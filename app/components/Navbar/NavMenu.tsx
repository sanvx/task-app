"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import NavButton from "./NavButton";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface NavMenuLinksProps {
  links: { href: string; text: string }[];
}

export default function NavMenu({ links }: NavMenuLinksProps) {
  const { ref, isOpen, setIsOpen } = useOutsideClick(); 
  const path = usePathname();

  const toggleMenuIsOpened = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="relative block md:hidden ">
      <NavButton
        menuIsOpened={isOpen}
        onToggleMenu={toggleMenuIsOpened}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute -top-2 -left-2 w-64 rounded-md bg-neutral-50 p-8 z-10 flex flex-col origin-top-left shadow-md"
          >
            <ul className="flex flex-col gap-2 flex-1">
              {links.map((link) => (
                <Link className={path === link.href ? "text-blue-500" : ""} key={link.text} href={link.href}>
                  <li className="text-2xl font-medium">{link.text}</li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
