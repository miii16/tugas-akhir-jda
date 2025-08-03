"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    await signIn("email", { email, callbackUrl: "/" });
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email kamu"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full py-2 text-white transition-all duration-300 bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Masuk
      </button>
    </div>
  );
}
