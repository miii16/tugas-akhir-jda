"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-xl font-bold text-blue-600">My MovieApp</div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-700 rounded-md md:hidden hover:bg-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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

        <div
          className={`flex-col md:flex-row md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"
          } md:translate-x-0`}
        >
          <Link
            href="/"
            className="block px-4 py-2 text-gray-700 hover:text-blue-600 md:mx-2"
            onClick={() => setIsOpen(false)}
          >
            Daftar Film
          </Link>
          <Link
            href="/login"
            className="block px-4 py-2 text-gray-700 hover:text-blue-600 md:mx-2"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block px-4 py-2 text-gray-700 hover:text-blue-600 md:mx-2"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
          <Link
            href="/add"
            className="block px-4 py-2 text-gray-700 hover:text-blue-600 md:mx-2"
            onClick={() => setIsOpen(false)}
          >
            Tambah Film
          </Link>
          <Link
            href="/manage"
            className="block px-4 py-2 text-gray-700 hover:text-blue-600 md:mx-2"
            onClick={() => setIsOpen(false)}
          >
            Edit Film
          </Link>
        </div>
      </div>
    </nav>
  );
}
