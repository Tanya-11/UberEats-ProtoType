import Axios from 'axios'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import './header.scss';
import { userLogInFail, USER_LOGOUT } from '../../redux/actions/actions';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Modal from '../common/Modal/Modal';
import CartModal from '../Cart/CartModal';

//import localStorage from 'redux-persist/es/storage';
const Header = () => {
    const [deliveryMode, setDeliveryMode] = useState(true)
    const [location, setLocation] = useState('')
    const [searchString, setSearchString] = useState('');
    const [isPopUp, setIsPopUp] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [showCartPopUp, setCartPopUp] = useState(false);
    let count = useSelector(state => state.cart.length);
    Axios.defaults.withCredentials = true;



    useEffect(() => {
        console.log("count", count);
    }, [])
    const changeDeliveryMode = () => {
        setDeliveryMode(!deliveryMode)
        console.log(deliveryMode)
    }
    const navigateToDashboard = () => {
        history.push('/dashboard');
    }


    //Axios.post('http://localhost:3001/dashboard')

    const goToOrder = () => {
        //history.push('/dashboard/cart-details')
        setCartPopUp(!showCartPopUp)
    }
    const showPopUp = () => {
        console.log('clicked' + isPopUp);
        setIsPopUp(!isPopUp);
    }

    return (
        <div className="header-container">
            <div className="uber-logo"
                onClick={navigateToDashboard}></div>
            <div className="cart">
                <button onClick={goToOrder}>
                    <ShoppingCartOutlinedIcon
                        className="cartIcon" />
                    <input type="text" disabled value={count}></input>
                </button>
            </div>

            {showCartPopUp && <div className="cartModal" >
                <span className="cross" onClick={goToOrder}>X</span>
                <CartModal></CartModal>
                {count > 0 && <button onClick={() => {
                    goToOrder();
                    history.push('/dashboard/cart-details')
                }}>Proceed to Checkout</button>}
            </div>
            }

            <div className="user-logo" onClick={showPopUp} />
            {isPopUp && <div className="modal"><Modal /></div>}

        </div>
    )
}

export default Header
