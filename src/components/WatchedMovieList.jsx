/* eslint-disable react/prop-types */
import WatchedMovie from './WatchedMovie'

function WatchedMovieList(props) {
    const { watched } = props
    return (
        <ul className='list'>
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export default WatchedMovieList
