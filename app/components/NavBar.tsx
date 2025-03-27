import NavLink from "./NavLink";

const links: { href: string; text: string }[] = [
  { href: "/", text: "Home" },
  { href: "/products", text: "Products" },
];

export default function NavBar() {
  return (
    <header className="header flex flex-row items-center h-18 max-h-24 shadow-md px-5 md:px-16 text-xl">
      <nav className="flex justify-self-end relative flex-row items-center justify-between min-w-auto gap-10 text-gray-600">
        <div className="hidden md:flex flex-row justify-between gap-10">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.text}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
