import NavLink from 'components/atoms/NavLink'

const Navigation = () => (
    <nav>
        <NavLink to='/' name='Home'/>
        |
        <NavLink to='/about' name='About' />
        |
        <NavLink to='/contact' name='Contact' />
    </nav>
)

export default Navigation
