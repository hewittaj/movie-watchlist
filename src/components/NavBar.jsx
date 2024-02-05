/* eslint-disable react/prop-types */

function NavBar(props) {
    const { children } = props
    return <nav className='nav-bar'>{children}</nav>
}

export default NavBar
