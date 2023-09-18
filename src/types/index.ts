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
