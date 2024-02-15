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

import { useEffect, useState } from 'react'
import useMovies from './useMovies'
import useLocalStorageState from './useLocalStorageState'
function App() {
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)
    const [watched, setWatched] = useLocalStorageState([], 'watched')
    const { movies, isLoading, error } = useMovies(query)

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
