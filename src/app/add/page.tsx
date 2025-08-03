"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormState {
  title: string;
  description: string;
  imageUrl: string;
  trailerUrl: string;
}

export default function AddMovieForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    imageUrl: "",
    trailerUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function changeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal tambah film");
      }

      router.push("/");
    } catch (err) {
      // Cek jika error adalah instance Error, jika tidak set error generic
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan tidak terduga");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-lg p-6 mx-auto mt-12 space-y-5 bg-white rounded shadow"
    >
      <h1 className="text-2xl font-bold text-center">Tambah Film Baru</h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      <input
        name="title"
        value={form.title}
        onChange={changeHandler}
        placeholder="Judul Film"
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={changeHandler}
        placeholder="Deskripsi Film"
        required
        rows={4}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={changeHandler}
        placeholder="URL Gambar Film"
        required
        type="url"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="trailerUrl"
        value={form.trailerUrl}
        onChange={changeHandler}
        placeholder="URL Trailer YouTube"
        required
        type="url"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Menyimpan..." : "Tambah Film"}
      </button>
    </form>
  );
}
