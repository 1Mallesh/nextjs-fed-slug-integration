// src/components/Header.tsx
"use client"; // <-- Add this at the very top

import React, { useState } from "react";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  type: "link" | "logo";
  logoUrl?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1, type: "logo", title: "MyLogo", logoUrl: "https://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png", url: "/" },
  { id: 2, type: "link", title: "About", url: "/about" },
  { id: 3, type: "link", title: "Services", url: "/services" },
  { id: 4, type: "link", title: "Products", url: "/products" },
  { id: 5, type: "link", title: "Blog", url: "/blog" },
    { id: 6, type: "link", title: "stories", url: "/stories" },

];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="mb-[90px]">
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50 mb-[90px]">
      <div className="max-w-[3500px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 ">
        {/* Logo */}
        <div className="flex items-center">
          {MENU_ITEMS.filter((item) => item.type === "logo").map((item) => (
            <a key={item.id} href={item.url} className="cursor-pointer">
              {item.logoUrl ? (
                <div className="flex items-center gap-2 text-amber-200 text-gray-700">
                <img src={item.logoUrl} alt="Logo" className="h-10 w-auto" />
                <h2>Machine Maze</h2>
                </div>
              ) : (
                <h1 className="text-xl font-bold">{item.title}</h1>
              )}
            </a>
          ))}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex gap-6 text-gray-700 font-medium">
            {MENU_ITEMS.filter((item) => item.type === "link").map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 px-4 py-4 text-gray-700 font-medium">
            {MENU_ITEMS.filter((item) => item.type === "link").map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="block hover:text-blue-600 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
    </div>
  );
}
