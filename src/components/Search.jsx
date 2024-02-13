import { useEffect, useRef } from 'react'

/* eslint-disable react/prop-types */
function Search(props) {
    const { query, setQuery } = props
    const inputEl = useRef(null)
    useEffect(() => {
        inputEl.current.focus()
    }, [])
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
