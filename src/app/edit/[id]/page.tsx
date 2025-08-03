import { notFound } from "next/navigation";
import EditMovieForm from "@/components/EditMovieForm";
import { db } from "@/lib/db";

interface Props {
  params: { id: string };
}

export default async function EditPage({ params }: Props) {
  const movie = await db.movie.findUnique({
    where: { id: params.id },
  });

  if (!movie) {
    notFound();
  }

  return (
    <main className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Edit Film</h1>
      {/* Kirim data movie ke client component */}
      <EditMovieForm movie={movie} />
    </main>
  );
}
