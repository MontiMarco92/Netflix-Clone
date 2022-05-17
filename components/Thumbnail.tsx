import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

interface Props {
  movie: Movie | DocumentData
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[240px]"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={movie.title}
        className="rounded-sm object-cover transition duration-200 ease-out md:min-w-[260px] md:rounded md:hover:scale-105"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail
