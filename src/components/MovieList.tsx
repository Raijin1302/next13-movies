import { FC } from "react"
import MovieCard from "./MovieCard"
import { Movie } from "@/types/movie"

interface MovieListProps {}

async function getPopularMoviesResponse() {
  const popularMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  )
  if (!popularMoviesResponse.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await popularMoviesResponse.json()
  return data.results
}

const MovieList: FC<MovieListProps> = async ({}) => {
  const popularMovies = await getPopularMoviesResponse()
  return (
    <div className="container mx-auto px-4 pt-16 mb-16">
      <div className="popular-movies">
        <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
          Popular Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 md:gap-x-4 sm:gap-x-2 py-6 ">
          {popularMovies.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
