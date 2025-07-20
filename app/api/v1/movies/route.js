// import { MOVIES } from "@/lib/data";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// export const revalidate = 3600; //Invalidate every hour

export const GET = async () => {
  try {
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: 1 })
      .limit(20)
      .toArray();

    // return NextResponse.json(MOVIES, { status: 200 });
    return NextResponse.json(movies);
  } catch (error) {
    console.log("Error fetching movies:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
