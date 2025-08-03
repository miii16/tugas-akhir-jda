import { db } from "@/lib/db";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default async function ManagePage() {
  const movies = await db.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-6xl p-6 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Kelola Film</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <div key={movie.id} className="p-4 bg-white rounded shadow">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="object-cover w-full h-48 rounded"
            />
            <h2 className="mt-4 text-xl font-semibold">{movie.title}</h2>
            <p className="mt-2 text-gray-600 line-clamp-3">{movie.description}</p>
            <div>
              <Link
                href={`/edit/${movie.id}`}
                className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <DeleteButton movieId={movie.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
