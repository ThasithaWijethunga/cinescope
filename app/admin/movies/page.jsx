import AddMovieDialog from "./add-movie-dialog";

export default function MoviesPage() {
  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
          <div>
              <h1 className="text-xl font-bold tracking-tight">Movies</h1>
              <p className=" text-muted-foreground">Manage your movie catalog</p>
          </div>
          <AddMovieDialog/>
       </div>
    </div>
    
    
  )
}
