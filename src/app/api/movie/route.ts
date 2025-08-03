import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { title, description, imageUrl, trailerUrl } = await req.json();

    if (!title || !description || !imageUrl || !trailerUrl) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    const movie = await db.movie.create({
      data: { title, description, imageUrl, trailerUrl },
    });

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
