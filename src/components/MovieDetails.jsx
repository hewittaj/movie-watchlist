/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import secrets from '../secrets'
import StarRating from './StarRating'
import Loader from './Loader'

const API_KEY = secrets.API_KEY
function MovieDetails(props) {
	const { selectedId, onCloseMovie, onAddWatchedMovie, watched } = props
	const [movie, setMovie] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [userRating, setUserRating] = useState('')
	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre
	} = movie

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating
		}
		onAddWatchedMovie(newWatchedMovie)
		onCloseMovie()
	}

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true)
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
				)
				const data = await res.json()
				setMovie(data)
				setIsLoading(false)
			}
			getMovieDetails()
		},
		[selectedId]
	)

	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}{' '}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span> {imdbRating} IMDb rating
							</p>
						</div>
					</header>
					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button
											className='btn-add'
											onClick={() => handleAdd(movie)}
										>
											+ Add to watched list
										</button>
									)}
								</>
							) : (
								<p>
									You have already rated this movie{' '}
									{watchedUserRating}
									<span>⭐</span>
								</p>
							)}
						</div>
						<p>
							Plot:
							<em> {plot}</em>
						</p>
						<p>Starring: {actors}</p>
						<p>Directed by: {director}</p>
					</section>
				</>
			)}
		</div>
	)
}

export default MovieDetails
