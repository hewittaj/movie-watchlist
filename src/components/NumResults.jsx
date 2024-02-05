/* eslint-disable react/prop-types */
function NumResults(props) {
    const { movies } = props
    return (
        <p className='num-results'>
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

export default NumResults
