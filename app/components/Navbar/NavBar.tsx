"use client";

import NavLink from "./NavLink";
import Search from "./Search";
import NavMenu from "./NavMenu";

const links: { href: string; text: string }[] = [
  { href: "/", text: "Home" },
  { href: "/products", text: "Products" },
];

export default function NavBar() {
  return (
    <header className="header flex flex-row justify-between items-center h-18 max-h-24 shadow-md px-5 md:px-16 text-xl">
      <nav className="hidden md:flex justify-self-end relative flex-row items-center justify-between min-w-auto gap-10 text-gray-600">
        <div className="flex flex-row justify-between gap-10">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.text}
            </NavLink>
          ))}
        </div>
      </nav>
      <NavMenu links={links} />
      <Search />
    </header>
  );
}
