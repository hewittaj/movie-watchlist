import { useEffect, useRef } from 'react'
import useKey from '../useKey'

/* eslint-disable react/prop-types */
function Search(props) {
    const { query, setQuery } = props
    const inputEl = useRef(null)
    useKey('Enter', () => {
        if (document.activeElement === inputEl.current) return
        inputEl.current.focus()
        setQuery('')
    })
    return (
        <input
            className='search'
            type='text'
            placeholder='Search movies...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search
