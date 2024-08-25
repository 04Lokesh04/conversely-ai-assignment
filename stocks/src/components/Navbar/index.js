import { Link } from 'react-router-dom'
import './index.css'

const Navbar=()=>{
    return (
        <nav className='navbar'>
            <h1 className='nav-heading'>Stocks</h1>
            <ul className='nav-items'>
                <li className='nav-links'>
                    <Link to='/'>Dashboard</Link>
                </li>
                <li className='nav-links'>
                    <Link to='/trade'>Trading</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar