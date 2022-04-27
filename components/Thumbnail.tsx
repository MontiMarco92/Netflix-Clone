import Image from 'next/image'
import { Movie } from '../typings'

interface Props {
  movie: Movie
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px]">
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
