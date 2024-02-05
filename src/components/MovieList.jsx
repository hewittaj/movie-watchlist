/* eslint-disable react/prop-types */
import Movie from './Movie'

function MovieList(props) {
    const { movies } = props
    return (
        <ul className='list'>
            {movies?.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export default MovieList
