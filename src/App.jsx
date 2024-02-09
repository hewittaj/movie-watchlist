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

    function handleAddWatched(movie) {
        setWatched((prevWatched) => [...prevWatched, movie])
    }

    function handleDeleteWatched(id) {
        setWatched((prevWatched) =>
            prevWatched.filter((movie) => movie.imdbID !== id)
        )
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
                    setError('')
                } catch (err) {
                    console.log(err.message)
                    if (err.name !== 'AbortError') {
                        setError(err.message)
                    }
                } finally {
                    setIsLoading(false)
                }
            }
            if (query.length < 4) {
                setMovies([])
                setError('')
                return
            }

            const timer = setTimeout(fetchMovies, 500)
            return () => clearTimeout(timer)
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
                            onAddWatchedMovie={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    )
}

export default App
