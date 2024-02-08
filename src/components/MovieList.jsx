/* eslint-disable react/prop-types */
import Movie from './Movie'

function MovieList(props) {
    const { movies, onSelectMovie } = props
    return (
        <ul className='list list-movies'>
            {movies?.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    )
}

export default MovieList
