import { FC } from "react"

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="nav fixed top-0 inset-x-0 h-fit bg-gray-900 dark:bg-slate-900/50 border-b border-gray-800 z-[10] py-3">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between lg:py-6 py-0">
        <ul className="flex flex-col md:flex-row items-center">
          <li>
            <a href="/" className="flex items-center font-bold text-xl">
              <span>next</span>
              &nbsp;
              <span className="text-orange-500">movies</span>
            </a>
          </li>
          <li className="md:ml-16 mt-3 md:mt-0">
            <a href="/" className="hover:text-gray-300">
              Movies
            </a>
          </li>
          <li className="md:ml-6 mt-3 md:mt-0">
            <a href="/tv" className="hover:text-gray-300">
              TV Shows
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
