/* eslint-disable react/prop-types */
import ListBox from './ListBox'
import WatchedBox from './WatchedBox'

function Main(props) {
    const { movies } = props
    return (
        <main className='main'>
            <ListBox movies={movies} />
            <WatchedBox />
        </main>
    )
}

export default Main
