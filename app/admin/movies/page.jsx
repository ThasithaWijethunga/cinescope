import AddMovieDialog from "./add-movie-dialog";
import MovieData from "./movie-data";
import MovieSelectors from "./movie-selectors";
import MovieTable from "./movie-table";

//Server component
export default async function MoviesPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  // console.log("query ", query);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Movies</h1>
          <p className=" text-muted-foreground">Manage your movie catalog</p>
        </div>
        <AddMovieDialog />
      </div>

      <MovieSelectors />

      {/* <MovieTable/> */}
      <MovieData query={query}/>
    </div>
  );
}
