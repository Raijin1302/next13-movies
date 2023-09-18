import { FC } from "react"

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="border border-t border-gray-800">
      <div className="container mx-auto text-sm px-4 py-6">
        Powered by{" "}
        <a
          href="https://www.themoviedb.org/documentation/api"
          target="_blank"
          className="underline hover:text-gray-300"
        >
          TMDb API
        </a>{" "}
        — UI Design by{" "}
        <a
          href="https://andremadarang.com/"
          target="_blank"
          className="underline hover:text-gray-300"
        >
          Andre Madarang
        </a>{" "}
        and built with
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          className="underline hover:text-gray-300"
        >
          Tailwind CSS
        </a>
        .
      </div>
    </footer>
  )
}

export default Footer
