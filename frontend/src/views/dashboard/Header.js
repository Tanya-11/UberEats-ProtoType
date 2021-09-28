import Axios from 'axios'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './header.scss'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; import localStorage from 'redux-persist/es/storage';
const Header = () => {
    const [deliveryMode, setDeliveryMode] = useState(true)
    const [location, setLocation] = useState('')
    const [searchString, setSearchString] = useState('')
    const [count, setCount] = useState(() => {
        localStorage.setItem('OrderCount', 0);
        return 0
    });
    const history = useHistory();
    const changeDeliveryMode = () => {
        setDeliveryMode(!deliveryMode)
        console.log(deliveryMode)
    }
    const navigateToDash = () => {
        history.push('/dashboard');
    }
    //Axios.post('http://localhost:3001/dashboard')

    return (
        <div className="header-container">
            <div className="uber-logo"
                onClick={navigateToDash}></div>
            <div className="toggle-switch">
                <button onClick={changeDeliveryMode}>Click</button>
            </div>
            <div className="location">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="location"
                />
            </div>
            <div className="search">
                <input
                    type="text"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="search"
                />
            </div>
            <div className="cart">
                <button>
                    <ShoppingCartOutlinedIcon
                        className="cartIcon" />
                    <input type="number" disabled value={count}></input>
                </button>
            </div>
        </div>
    )
}

export default Header
