import { db } from "@/lib/db";
import MovieTable from "./movie-table";
import { searchMovie } from "@/actions/movies";

export default async function MovieData({ query = "" }) {
  try {
    // const movies = await db.collection("movies_n").find({}).limit(50).toArray();
    // const movies = await searchMovie(query);
    const { data: moviesData = [] } = await searchMovie(query);

    if (!moviesData.length) throw new Error("No movies found in the database");

    // if(moviesData.length > 0){
    const refinedMovies = moviesData.map((movie) => ({
      id: movie._id.toString(),
      title: movie.title,
      status: movie.status ?? "published",
      rating: movie.rating,
      year: movie.year,
      plot: movie.plot,
      genres: movie.genres,
      poster: movie.poster,
      imdb: movie.imdb,
      runtime: movie.runtime,
      directors: movie.directors,
    }));

    return <MovieTable movies={refinedMovies} />;
    // }else{
    //     throw new Error("No movies found in the database");
    // }
  } catch (error) {
    console.log("Error fetching movies:", error);
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className=" text-destructive font-medium animate-pulse duration-1000">
          No movies Available
        </p>
      </div>
    );
  }
}
