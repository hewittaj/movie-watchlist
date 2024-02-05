/* eslint-disable react/prop-types */
import { useState } from 'react'
import MovieList from './MovieList'

function ListBox(props) {
    const { movies } = props
    const [isOpen1, setIsOpen1] = useState(true)
    return (
        <div className='box'>
            <button
                className='btn-toggle'
                onClick={() => setIsOpen1((open) => !open)}
            >
                {isOpen1 ? '–' : '+'}
            </button>
            {isOpen1 && <MovieList movies={movies} />}
        </div>
    )
}

export default ListBox
