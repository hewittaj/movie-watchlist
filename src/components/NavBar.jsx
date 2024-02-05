/* eslint-disable react/prop-types */
import Search from './Search'
import Logo from './Logo'
import NumResults from './NumResults'

function NavBar(props) {
    const { movies } = props
    return (
        <nav className='nav-bar'>
            <Logo />
            <Search />
            <NumResults movies={movies} />
        </nav>
    )
}

export default NavBar
