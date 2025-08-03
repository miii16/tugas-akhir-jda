import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { title, description, imageUrl, trailerUrl } = await req.json();

    // Validasi semua field wajib diisi
    if (!title || !description || !imageUrl || !trailerUrl) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    // Simpan data ke database
    const movie = await db.movie.create({
      data: { title, description, imageUrl, trailerUrl },
    });

    // Kembalikan data film yang berhasil dibuat dengan status 201 Created
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    // Tangani error server dengan response 500
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
