// src/app/login/page.tsx
import React from "react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-6 py-12 bg-gray-100">
      <section className="w-full max-w-md p-10 bg-white border border-gray-200 shadow-xl rounded-xl">
        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-wide text-blue-600 drop-shadow-sm">
            MoviesMy
          </h1>
          <p className="mt-2 font-semibold tracking-widest text-gray-500 uppercase">
            Cinema Login
          </p>
        </div>

        {/* Form */}
        <form
          action="/api/auth/callback/credentials"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 text-gray-800 transition bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-800 transition bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-500">
          New here?{" "}
          <a href="/register" className="font-semibold text-blue-600 hover:underline">
            Create an account
          </a>
        </p>
      </section>
    </main>
  );
}
