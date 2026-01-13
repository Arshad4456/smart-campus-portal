"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/"].includes(pathname); // Only show on homepage
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/landing")
      .then((res) => setNavbar(res.data.landingPage.navbar))
      .catch((err) => console.error(err));
  }, []);

  if (!showNavbar) return null;

  // Show loading if navbar data hasn't loaded yet
  if (!navbar) {
    return (
      <nav className="bg-gray-800 fixed top-2 right-2 w-[96%] mx-auto flex justify-between items-center px-4 py-2 rounded-full z-50">
        <div className="text-white px-4 py-2">Loading navbar...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 fixed top-2 right-2 w-[96%] mx-auto flex justify-between items-center px-4 py-2 rounded-full z-50">
      {/* Logo */}
      <div className="flex items-center gap-10 pl-6">
        <Link href="/">
          <img
            className="h-12 w-12 rounded-full"
            src={navbar.logo}
            alt="University Logo"
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-3 text-white items-center">
        {navbar.links.map((link, i) => (
          <Link
            key={i}
            href={link.url}
            className="hover:bg-gray-100 hover:text-black px-3 py-2 rounded-full"
          >
            {link.name}
          </Link>
        ))}

        <Link
          href="/login"
          target="_blank"
          className="bg-gray-100 hover:bg-gray-300 text-black px-4 py-2 rounded-lg font-bold"
        >
          {navbar.loginButtonText}
        </Link>
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 right-2 w-80 bg-gray-800 rounded-lg shadow-lg py-2 flex flex-col gap-1 text-white">
          {navbar.links.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              className="px-3 py-2 hover:bg-gray-100 hover:text-black rounded"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="px-3 py-2 mt-2 bg-gray-100 text-black rounded font-bold text-center"
            onClick={() => setIsOpen(false)}
          >
            {navbar.loginButtonText}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
