import Image from "next/image"
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
        <div className="flex-none relative aspect-square w-76 h-[350px]  items-center">
          <Image
            src={people.profile_path}
            alt={`${people.title} Poster`}
            className="movie-poster object-contain"
            id="people-poster"
            fill
          />
          <ul className="flex items-center mt-9 absolute md:right-36  right-64 -bottom-10 ">
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
            {social.instagram_id && (
              <li className="ml-6">
                <Link
                  href={`https://www.instagram.com/${social.instagram_id}`}
                  title="Instagram"
                  target="_blank"
                >
                  <svg
                    className="fill-current text-gray-400 hover:text-white w-6"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </Link>
              </li>
            )}
            {social.twitter_id && (
              <li className="ml-6">
                <Link
                  href={`https://www.twitter.com/${social.twitter_id}`}
                  title="Twitter"
                  target="_blank"
                >
                  <svg
                    className="fill-current text-gray-400 hover:text-white w-6"
                    viewBox="0 0 512 512"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="md:ml-24 mt-16 md:mt-0">
          <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{people.name}</h2>
          <div className="flex flex-wrap items-center text-gray-400 text-sm my-3">
            <svg
              className="fill-current text-gray-400 hover:text-white w-4"
              viewBox="0 0 448 512"
            >
              <path d="M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z" />
            </svg>
            <span className="ml-2">
              {people.birthday} ({people.age} years old) in{" "}
              {people.place_of_birth}
            </span>
          </div>
          <p className="text-gray-300 mt-8 ">{people.biography}</p>
          <h4 className="font-semibold mt-12">Known For</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 md:gap-x-8 py-4">
            {knownFor.map((movie: any) => (
              <div className="mt-4 my-8 relative w-44 h-[400px] lg:h-[300px] mx-auto">
                <Link href={movie.linkToPage}>
                  <Image
                    src={movie.poster_path}
                    alt={movie.title}
                    className="thumbnail hover:opacity-75 transition ease-in-out duration-150"
                    id={`movie-poster-${movie.id}`}
                    fill
                  />
                </Link>
                <div className="relative mt-2 text-center top-full">
                  <Link
                    href={movie.linkToPage}
                    className="text-sm leading-normal block text-gray-400 hover:text-white mt-1"
                  >
                    {movie.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
