import './index.css'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

const Dashboard=({holdings})=>{
    return (
        <div className='main'>
            <Navbar />
            <div className='dashboard-card'>
                <h1 className='heading1'>Current Holdings</h1>
                <Link to='/trade'>
                    <button className='dashbutton' type='button'>Start Trading</button>
                </Link>
                <ul className='holdingscard'>
                    {holdings.length>0 ? (holdings.map((each, index)=>(
                        <li className='hold' key={index}>
                            {each.symbol}: {each.quantity} shares at ${each.price} each
                        </li>
                    ))):<p className='dashpara'>No Holdings available , Click on Start Trading to add new Holdings</p>}
                </ul>
            </div>
        </div>
    )

}

export default Dashboard