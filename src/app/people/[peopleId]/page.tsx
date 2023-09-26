import Link from "next/link"

interface pageProps {
  params: {
    peopleId: string
  }
}

function calculateAge(birthday: any) {
  const ageDifMs = Date.now() - birthday
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

async function getPeopleDetailResponse(peopleId: string) {
  const profileUrl = `https://api.themoviedb.org/3/person/${peopleId}?append_to_response=external_ids,combined_credits&api_key=${process.env.TMDB_API_KEY}`
  const profilResponse = await fetch(profileUrl, { cache: "no-store" })
  if (!profilResponse) {
    throw new Error("Failed to fetch data")
  }

  const profileData = await profilResponse.json()

  const people = {
    ...profileData,
    profile_path: profileData.profile_path
      ? "https://image.tmdb.org/t/p/w300/" + profileData.profile_path
      : "https://via.placeholder.com/300x450",
    birthday: new Date(profileData.birthday).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    age: calculateAge(new Date(profileData.birthday)),
  }

  const castMovies = profileData.combined_credits.cast || []
  const knownFor = castMovies
    .sort((a: any, b: any) => b.popularity - a.popularity)
    .slice(0, 5)
    .map((movie: any) => {
      const title = movie.title || movie.name || "Untitled"

      return {
        ...movie,
        title,
        poster_path: movie.poster_path
          ? "https://image.tmdb.org/t/p/w185/" + movie.poster_path
          : "https://via.placeholder.com/185x278",
        linkToPage:
          movie.media_type === "movie"
            ? `/movies/${movie.id}`
            : `/tv/${movie.id}`,
      }
    })

  const social = profileData.external_ids
  const credits = castMovies
    .map((movie: any) => {
      const title = movie.title || movie.name || "Untitled"
      const release_date = movie.release_date || movie.first_air_date || ""

      return {
        ...movie,
        title,
        release_date,
        release_year: release_date ? release_date.split("-")[0] : "Future",
        linkToPage:
          movie.media_type === "movie"
            ? `/movies/${movie.id}`
            : `/tv/${movie.id}`,
      }
    })
    .sort((a: any, b: any) => {
      const dateA = new Date(a.release_date || "")
      const dateB = new Date(b.release_date || "")
      return dateB.getTime() - dateA.getTime()
    })

  return { people, castMovies, knownFor, social, credits }
}

const page = async ({ params }: pageProps) => {
  const { peopleId } = params
  const { people, castMovies, knownFor, social, credits } =
    await getPeopleDetailResponse(peopleId)
  return (
    <div className="movie-info border-b border-gray-800 py-7">
      <div className="container mx-auto px-4 py-32 flex flex-col md:flex-row">
        <div className="flex-none">
          <ul className="flex items-center mt-4">
            {social.facebook_id && (
              <li>
                <Link
                  href={`https://www.facebook.com/${social.facebook_id}`}
                  title="Facebook"
                  target="_blank"
                >
                  <svg
                    className="fill-current text-gray-400 hover:text-white w-6"
                    viewBox="0 0 448 512"
                  >
                    <path d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z" />
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default page
