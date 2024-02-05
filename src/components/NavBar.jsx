import { useState } from 'react'
import Search from './Search'
import Logo from './Logo'
import NumResults from './NumResults'

function NavBar(props) {
    return (
        <nav className='nav-bar'>
            <Logo />
            <Search />
            <NumResults />
        </nav>
    )
}

export default NavBar