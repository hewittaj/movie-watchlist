/* eslint-disable react/prop-types */
import WatchedMovie from './WatchedMovie'

function WatchedMovieList(props) {
	const { watched, onDeleteWatched } = props
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie
					key={movie.imdbID}
					movie={movie}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	)
}

export default WatchedMovieList
