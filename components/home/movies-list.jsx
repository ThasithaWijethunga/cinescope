import { MOVIES } from "@/lib/data";
import { getMovies } from "@/actions/movies";
import MovieCard, { MoviesCardSkeleton } from "./movie-card";

export default async function MoviesList() {
  const movies = await getMovies();

  if (!movies || movies.length === 0) {
    return <div className="text-foreground font-medium text-center py-12"> No movies found</div>;
  }

  // console.log("Movies : ", movies);

  {
    /* Movie card here */
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Loop movies */}
      {/* {MOVIES.map((movie) => ( */} {/* hardcode */}
      {movies.map((movie, index) => (
        <div key={`${movie._id}-${index}`}>
          <MovieCard movie={movie}/>
        </div>
      ))}
    </div>
  );
}

export function MoviesListSkeleton(){
    return(
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array(8).fill(0).map((_,i) => (
              <MoviesCardSkeleton key={i} />
            ))}
        </div>
    );
}
