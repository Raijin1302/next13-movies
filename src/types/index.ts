export interface Genre {
  id: number
  name: string
}

export interface Crew {
  id: number
  name: string
  department: string
  original_language: string
  credit_id: string
  overview: string
  vote_count: number
  poster_path: string
  backdrop_path: string
  popularity: number
  genre_ids: number[]
  job: string
  vote_average: number
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Image {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Images {
  id: number
  backdrops: Image[]
  logos: Image[]
  posters: Image[]
}

export interface MovieWithMediaType extends Movie {
  media_type: "movie"
}

export interface TVWithMediaType extends TV {
  media_type: "tv"
}

export type KnownFor = MovieWithMediaType | TVWithMediaType

export interface Person {
  id: number
  name: string
  known_for: KnownFor[]
  profile_path: string
  adult: boolean
  known_for_department: string
  gender: number
  popularity: number
}

export interface ExternalIds {
  imdb_id: string
  facebook_id: string
  instagram_id: string
  twitter_id: string
  id: number
}

export interface Movie {
  id: number
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface TV {
  id: number
  name: string
  first_air_date: string
  backdrop_path: string
  genre_ids: number[]
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  popularity: number
  vote_count: number
  vote_average: number
}
