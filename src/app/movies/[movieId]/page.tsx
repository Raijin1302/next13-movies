import ModalPlayerTrailer from "@/components/ModalPlayerTrailer"
import { Cast, Crew } from "@/types"
import Link from "next/link"
import Image from "next/image"
import ModalImages from "@/components/ModalImages"
interface pageProps {
  params: {
    movieId: string
  }
}

async function getMovieDetailResponse(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos,images&api_key=${process.env.TMDB_API_KEY}`
  const response = await fetch(url, { cache: "no-store" })
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await response.json()

  const movie = {
    ...data,
    poster_path: data.poster_path
      ? "https://image.tmdb.org/t/p/w500/" + data.poster_path
      : "https://via.placeholder.com/500x750",
    vote_average: (data.vote_average * 10).toFixed(2) + "%",
    release_date: new Date(data.release_date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    genres: data.genres.map((g: { name: string }) => g.name).join(", "),
    crew: data.credits.crew.slice(0, 3),
    cast: data.credits.cast.slice(0, 5).map((c: { profile_path: string }) => ({
      ...c,
      profile_path: c.profile_path
        ? "https://image.tmdb.org/t/p/w300/" + c.profile_path
        : "https://via.placeholder.com/300x450",
    })),
    images: data.images.backdrops.slice(0, 9),
  }

  return movie
}

const page = async ({ params }: pageProps) => {
  const { movieId } = params
  const movie = await getMovieDetailResponse(movieId)

  return (
    <>
      <div className="movie-info border-b border-gray-800 py-7">
        <div className="container mx-auto px-4 py-32 flex flex-col md:flex-row">
          <div className="lg:flex-none flex relative aspect-square w-64 lg:w-96 h-[500px] mx-auto  ">
            <Image
              src={movie.poster_path}
              alt={`${movie.title} Poster`}
              className="movie-poster object-contain"
              id="movie-poster"
              fill
            />
          </div>
          <div className="md:ml-24">
            <h2 className="text-4xl mt-4 md:mt-0 mb-2 font-semibold">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center text-gray-400 text-sm">
              <svg
                className="fill-current text-orange-500 w-4"
                viewBox="0 0 24 24"
              >
                <g data-name="Layer 2">
                  <path
                    d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                    data-name="star"
                  />
                </g>
              </svg>
              <span className="ml-1">{movie.vote_average}</span>
              <span className="mx-2">|</span>
              <span>{movie.release_date}</span>
              <span className="mx-2">|</span>
              <span>{movie.genres}</span>
            </div>
            <p className="text-gray-300 mt-8">{movie.overview}</p>
            <div className="mt-12">
              <h4 className="text-white font-semibold">Fetured Crew</h4>
              <div className="flex mt-4">
                {movie.crew.map((crew: Crew) => (
                  <div key={crew.id} className="mr-8">
                    <div>{crew.name}</div>
                    <div className="text-gray-400 text-sm">{crew.job}</div>
                  </div>
                ))}
              </div>
              <ModalPlayerTrailer
                movieId={movie.id}
                video={movie.videos.results[0].key}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="movie-cast border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-semibold ml-2 lg:ml-9">Cast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 md:gap-x-4 py-4">
            {movie.cast.map((cast: Cast) => (
              <div className="my-8 relative w-72 h-[400px] lg:h-[300px] mx-auto">
                <Link href={`/people/${cast.id}`}>
                  <Image
                    id={`/people/${cast.id}`}
                    src={cast.profile_path}
                    alt={cast.name}
                    className="thumbnail hover:opacity-75 transition ease-in-out duration-150 object-contain"
                    fill
                  />
                </Link>
                <div className="relative mt-2 text-center  top-full">
                  <Link
                    href={`/people/${cast.id}`}
                    className="text-lg hover:text-gray-300"
                  >
                    {cast.name}
                  </Link>
                  <div className="text-sm text-gray-400">{cast.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalImages movieId={movie.id} images={movie.images} />
    </>
  )
}

export default page
