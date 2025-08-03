"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        // ✅ Arahkan ke halaman login
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Gagal register");
      }
    } catch (err) {
      setError("Terjadi kesalahan");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Daftar Akun</h2>

      <input
        type="text"
        placeholder="Nama Lengkap"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded">
        Daftar
      </button>
    </form>
  );
}
