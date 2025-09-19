// components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo / Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Mallesh Portfolio
        </Link>

        {/* Desktop Menu (right aligned) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <Link href="/about" className="hover:text-blue-500">About</Link>
          <Link href="/experience" className="hover:text-blue-500">Experience</Link>
          <Link href="/projects" className="hover:text-blue-500">Projects</Link>
          <Link href="/services" className="hover:text-blue-500">Services</Link>
          <Link href="/features" className="hover:text-blue-500">Features</Link>
          <Link href="/payments" className="hover:text-blue-500">Payments</Link>
          <Link href="/contact" className="hover:text-blue-500">Contact</Link>
          <Link href="/extra" className="hover:text-blue-500">Extra</Link>
        </nav>

        {/* Mobile Menu Button (right) */}
        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded focus:outline-none focus:ring"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger when closed, X when open */}
          {isOpen ? (
            // Cross (X) icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown (right aligned) */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-4">
          <nav className="flex flex-col items-end space-y-3 text-left">
            <Link href="/" onClick={() => setIsOpen(false)} className="block w-full">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block w-full">About</Link>
            <Link href="/experience" onClick={() => setIsOpen(false)} className="block w-full">Experience</Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="block w-full">Projects</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="block w-full">Services</Link>
            <Link href="/features" onClick={() => setIsOpen(false)} className="block w-full">Features</Link>
            <Link href="/payments" onClick={() => setIsOpen(false)} className="block w-full">Payments</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block w-full">Contact</Link>
            <Link href="/extra" onClick={() => setIsOpen(false)} className="block w-full">Extra</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
