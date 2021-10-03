import Axios from 'axios'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './header.scss';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
//import localStorage from 'redux-persist/es/storage';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
    const [deliveryMode, setDeliveryMode] = useState(true)
    const [location, setLocation] = useState('')
    const [searchString, setSearchString] = useState('')
    let count = useSelector(state => state.cart[state.cart.length - 1].orderCount
    );
    Axios.defaults.withCredentials = true;

    const history = useHistory();

    useEffect(() => {
        console.log("count", count);
    }, [count])
    const changeDeliveryMode = () => {
        setDeliveryMode(!deliveryMode)
        console.log(deliveryMode)
    }
    const navigateToDash = () => {
        history.push('/dashboard');
    }

    const logOut = () => {
        localStorage.clear();
        history.push('/')
        // Axios.get('http://localhost:3001/logOut')
        //     .then((res) => {
        //         console.log('logout successful', res);
        //     })
        //     .catch((err) => {
        //         console.log('logout fail', err);
        //     })

    }
    //Axios.post('http://localhost:3001/dashboard')

    const goToOrder = () => {
        history.push('/orderDetails')
    }

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
                <button onClick={goToOrder}>
                    <ShoppingCartOutlinedIcon
                        className="cartIcon" />
                    <input type="number" disabled value={count}></input>
                </button>
            </div>
            <div className="logout" onClick={logOut}>
                <LogoutIcon></LogoutIcon>
            </div>
        </div>
    )
}

export default Header
