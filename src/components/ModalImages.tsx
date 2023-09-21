"use client"
import { Images } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { Button } from "./ui/Button"
import { X } from "lucide-react"

interface ModalImagesProps {
  movieId: string
  images: Images[]
}

const ModalImages: FC<ModalImagesProps> = ({ movieId, images }) => {
  const router = useRouter()
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsImageOpen(true)
  }

  const closeModal = () => {
    setIsImageOpen(false)
  }

  return (
    <div className="movies-images">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-semibold ml-2 lg:ml-9">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((image: any) => (
            <div className="mt-8 mx-auto">
              <Link href="#" onClick={openModal}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  loading="lazy"
                  className="thumbnail hover:opacity-75 transition ease-in-out duration-150 object-contain"
                  width={1000}
                  height={500}
                  alt="sadasd"
                />
              </Link>

              {isImageOpen && (
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
                      <Image
                        className="responsive-iframe w-full h-[200px] lg:h-[500px]"
                        src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                        width={1000}
                        height={500}
                        alt="img"
                      ></Image>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModalImages
