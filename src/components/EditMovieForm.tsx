"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  trailerUrl: string;
}

interface Props {
  movie: Movie;
}

export default function EditMovieForm({ movie }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: movie.title,
    description: movie.description,
    imageUrl: movie.imageUrl,
    trailerUrl: movie.trailerUrl,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/movie/${movie.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal update film");
      return;
    }

    router.push("/");
  }

  return (
    <form onSubmit={submitHandler} className="max-w-lg mx-auto space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={changeHandler}
        placeholder="Judul Film"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={changeHandler}
        placeholder="Deskripsi Film"
        required
        className="w-full p-2 border rounded"
        rows={4}
      />
      <input
        type="text"
        name="imageUrl"
        value={form.imageUrl}
        onChange={changeHandler}
        placeholder="URL Gambar Film"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="trailerUrl"
        value={form.trailerUrl}
        onChange={changeHandler}
        placeholder="URL Trailer YouTube"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Update Film"}
      </button>
    </form>
  );
}
