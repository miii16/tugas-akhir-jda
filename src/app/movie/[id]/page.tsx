import { notFound } from "next/navigation";
import { db } from "@/lib/db";

interface Props {
  params: { id: string };
}

function getEmbedUrl(youtubeUrl: string) {
  try {
    const url = new URL(youtubeUrl);

    if (
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtube.com"
    ) {
      const videoId = url.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      if (url.pathname.startsWith("/embed/")) {
        return youtubeUrl;
      }
    }

    if (url.hostname === "youtu.be") {
      // Potong path slash depan dan hapus parameter query
      const videoId = url.pathname.slice(1).split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return "";
  } catch {
    return "";
  }
}

export default async function MovieDetailPage({ params }: Props) {
  const movie = await db.movie.findUnique({
    where: { id: params.id },
  });

  if (!movie) {
    notFound();
  }

  const embedUrl = getEmbedUrl(movie.trailerUrl);

  return (
    <main className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{movie.title}</h1>
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="object-cover w-full mb-4 rounded max-h-96"
      />
      <p className="mb-4 whitespace-pre-line">{movie.description}</p>
      {embedUrl ? (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={embedUrl}
            title={`Trailer ${movie.title}`}
            allowFullScreen
            className="w-full h-64 rounded"
          />
        </div>
      ) : (
        <p className="font-semibold text-red-600">Trailer tidak tersedia.</p>
      )}
    </main>
  );
}
