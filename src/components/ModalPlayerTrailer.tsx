"use client"
import { useRouter } from "next/navigation"
import { FC, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { Button } from "./ui/Button"
interface ModalPlayerTrailerProps {
  movieId: string
  video: string
}

const ModalPlayerTrailer: FC<ModalPlayerTrailerProps> = ({
  movieId,
  video,
}) => {
  const router = useRouter()
  const [isOpenVideo, setIsOpenVideo] = useState<boolean>(false)

  const openModal = () => {
    setIsOpenVideo(true)
    router.push(`/movies/${movieId}`)
  }

  const closeModal = () => {
    setIsOpenVideo(false)
  }

  return (
    <div className="mt-12">
      <button
        className="flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150"
        onClick={openModal}
      >
        <svg className="w-6 fill-current" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
        <span className="ml-2">Play Trailer</span>
      </button>
      {isOpenVideo && (
        <div className="fixed inset-0 bg-zinc-900/20 z-10">
          <div className="container flex items-center h-full max-w-5xl mx-auto">
            <div className="relative bg-zinc-900 w-full h-fit py-8 px-8 rounded-lg ">
              <div className="absolute top-4 right-4">
                <Button
                  variant="subtle"
                  className="rounded-md h-7 w-7 p-0"
                  aria-label="close modal"
                  onClick={closeModal}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <iframe
                className="responsive-iframe w-full h-[200px] lg:h-[500px]"
                src={`https://www.youtube.com/embed/${video}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalPlayerTrailer
