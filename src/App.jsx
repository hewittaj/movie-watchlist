import Box from './components/Box'
import ErrorMessage from './components/ErrorMessage'
import Loader from './components/Loader'
import Logo from './components/Logo'
import Main from './components/Main'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'
import NavBar from './components/NavBar'
import NumResults from './components/NumResults'
import Search from './components/Search'
import WatchedMovieList from './components/WatchedMovieList'
import WatchedSummary from './components/WatchedSummary'
import secrets from './secrets'

import { useEffect, useState } from 'react'
const API_KEY = secrets.API_KEY
function App() {
	const [movies, setMovies] = useState([])
	const [watched, setWatched] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [query, setQuery] = useState('')
	const [selectedId, setSelectedId] = useState(null)

	function handleSelectMovie(id) {
		setSelectedId((prevId) => (id === prevId ? null : id))
	}

	function handleCloseMovie() {
		setSelectedId(null)
	}

	useEffect(
		function () {
			async function fetchMovies() {
				try {
					setIsLoading(true)
					setError('')
					const res = await fetch(
						`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
					)

					if (!res.ok)
						throw new Error(
							'Something went wrong with fetching movies.'
						)

					const data = await res.json()
					if (data.Response === 'False') {
						throw new Error('Movie not found.')
					}
					setMovies(data.Search)
				} catch (err) {
					console.log(err.message)
					setError(err.message)
				} finally {
					setIsLoading(false)
				}
			}
			if (query.length < 4) {
				setMovies([])
				setError('')
				return
			}
			fetchMovies()
		},
		[query]
	)
	return (
		<>
			<NavBar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>

			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							onSelectMovie={handleSelectMovie}
						/>
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	)
}

export default App
