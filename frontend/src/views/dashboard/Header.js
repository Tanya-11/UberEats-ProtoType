import Axios from 'axios';
import { useEffect, useState } from 'react';
import './header.scss';


const Header=()=>{

   const [deliveryMode, setDeliveryMode]= useState(true);
    const [location, setLocation] = useState('');
    const [searchString, setSearchString] = useState('');

    const changeDeliveryMode=()=>{
          setDeliveryMode(!deliveryMode)
          console.log(deliveryMode);
    }

    //Axios.post('http://localhost:3001/dashboard')



    return(
        <div className="header-container">
            <div className="uber-logo"></div>
            <div className="toggle-switch">
                <button onClick={changeDeliveryMode}>Click</button>
            </div>
            <div className="location">
                <input type="text"
                 value={location} 
                 onChange={e=>setLocation(e.target.value)}
                 placeholder="location"
                 />
            </div>
            <div className="search">
            <input type="text"
                 value={searchString} 
                 onChange={e=>setSearchString(e.target.value)}
                 placeholder="search"
                 />
            </div>
            <div className="cart">
                <input type="text" 
                placeholder="cart"
                disabled
                />
            </div>
        </div>
    )
};

export default Header;