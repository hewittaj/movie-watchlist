/* eslint-disable react/prop-types */
function Search(props) {
    const { query, setQuery } = props

    return (
        <input
            className='search'
            type='text'
            placeholder='Search movies...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

export default Search
