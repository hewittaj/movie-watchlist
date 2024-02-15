import { useEffect, useState } from 'react'
import secrets from './secrets'
function useMovies(query) {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const API_KEY = secrets.API_KEY

    useEffect(
        function () {
            // callback?.()
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
            // handleCloseMovie()
            return () => clearTimeout(timer)
        },
        [query, API_KEY]
    )
    return { movies, isLoading, error }
}
export default useMovies
