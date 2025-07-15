import { db } from "@/lib/db";
import MovieTable from "./movie-table";

export default async function MovieData() {
  try{
    const movies = await db.collection("movies_n").find({}).limit(50).toArray();

    if(movies.length > 0){
        const refinedMovies = movies.map((movie, key) => ({
            id: movie._id.toString(),
            title: movie.title,
            status: movie.status,
            rating : movie.rating,
            year: movie.year,
            plot: movie.plot,
            genres: movie.genres,
            poster: movie.poster,
            imdb: movie.imdb,
            runtime: movie.runtime,
            directors: movie.directors,
        }));

        return < MovieTable movies={refinedMovies}/>
    }else{
        throw new Error("No movies found in the database");
    }
  }catch(error){
     console.log("Error fetching movies:", error);
     return(
        <div className="flex justify-center items-center h-[400px]">
           <p className=" text-destructive font-medium animate-pulse duration-1000">No movies Available</p>
        </div>
     );
  }
}
