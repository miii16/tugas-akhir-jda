import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/movie/[id]
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const movie = await db.movie.findUnique({
      where: { id },
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
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const updated = await db.movie.update({
      where: { id },
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
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await db.movie.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Movie deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
