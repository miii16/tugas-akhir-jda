"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  movieId: string;
}

export default function DeleteButton({ movieId }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Yakin ingin menghapus film ini?")) return;

    const res = await fetch(`/api/movie/${movieId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Film berhasil dihapus");
      router.refresh(); // refresh halaman agar data terbaru muncul
    } else {
      const data = await res.json();
      alert(`Gagal menghapus film: ${data.error || "Unknown error"}`);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="inline-block px-4 py-2 mt-4 ml-2 text-white bg-red-600 rounded hover:bg-red-700"
    >
      Delete
    </button>
  );
}
