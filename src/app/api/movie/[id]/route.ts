import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/movie/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const movie = await db.movie.findUnique({
      where: { id: params.id },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 });
  }
}

// PUT /api/movie/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updated = await db.movie.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        trailerUrl: body.trailerUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/movie/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.movie.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Movie deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
