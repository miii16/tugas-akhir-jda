"use client";

import { useState } from "react";

export default function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl, trailerUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add movie");
      }

      setTitle("");
      setDescription("");
      setImageUrl("");
      setTrailerUrl("");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-4 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Tambah Film Baru</h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {success && <p className="mb-4 text-green-600">Film berhasil ditambahkan!</p>}

      <label className="block mb-2 font-semibold" htmlFor="title">Judul Film</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 font-semibold" htmlFor="description">Deskripsi</label>
      <textarea
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 font-semibold" htmlFor="imageUrl">URL Gambar</label>
      <input
        id="imageUrl"
        type="url"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
        placeholder="https://image.tmdb.org/t/p/original/..."
      />

      <label className="block mb-2 font-semibold" htmlFor="trailerUrl">URL Trailer (YouTube)</label>
      <input
        id="trailerUrl"
        type="url"
        value={trailerUrl}
        onChange={e => setTrailerUrl(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
        placeholder="https://www.youtube.com/watch?v=..."
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Menyimpan..." : "Tambah Film"}
      </button>
    </form>
  );
}
