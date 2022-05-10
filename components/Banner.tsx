import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Movie } from '../typings'
import { baseUrl } from '../constants/movie'
import { FaPlay } from 'react-icons/fa'
import { RiInformationLine } from 'react-icons/ri'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * netflixOriginals.length)
    setMovie(netflixOriginals[randomIndex])
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="text-s max-w-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="banner-btn bg-white text-black">
          <FaPlay className="h-5 w-5 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="banner-btn bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          <RiInformationLine className="h-6 w-6 text-white md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner
