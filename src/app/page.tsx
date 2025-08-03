import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const movies = await db.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <main className="min-h-screen px-6 py-12 bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-12 text-5xl font-bold text-center text-blue-800">
            🎬 Koleksi Trailer Film
          </h1>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="overflow-hidden transition bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={movie.imageUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {movie.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {movie.description}
                  </p>
                  <Link
                    href={`/movie/${movie.id}`}
                    className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    🎥 Lihat Trailer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
