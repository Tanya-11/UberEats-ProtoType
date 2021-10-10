import React, { useEffect, useState } from 'react'
import './CustomerProfile.scss'
import Axios from 'axios'
import { useSelector } from 'react-redux'
// import RestCard from '../common/RestCard'
import { useHistory } from 'react-router'
import { Favorites } from './Favourites'
import { About } from './About'
const CustomerProfile = () => {
    const [file, setFile] = useState('')
    const history = useHistory()
    const customer = useSelector((state) => state.userLogin.text.user)
    // Axios.defaults.withCredentials = true;
    // const [userData, setUserData] = useState({
    //   name: '',
    //   email: customer,
    //   phone: '',
    //   city: '',
    //   state: '',
    //   country: ''
    // });
    const [showAbout, setShowAbout] = useState(false)

    const setShowState = () => {
        setShowAbout(!showAbout)
    }

    const navigateToDashboard = () => {
        history.push('/dashboard')
    }

    const onImageChange = (event) => {
        console.log(event.target.files[0])
        // if (event.target.value) {
        //   setFile(
        //     URL.createObjectURL(event.target.value)
        //   );
        // }
    }

    return (
        <div className="CustomerProfile">
            <div className="leftContent">
                <ul>
                    <li className="uber-logo" onClick={navigateToDashboard}></li>
                    <li onClick={setShowState}>About</li>
                    <li onClick={setShowState}>Favorites</li>
                </ul>
            </div>
            <div className="rightContent">
                {!showAbout ? (
                    <About data={customer} disabled={false} />
                ) : (
                    <Favorites data={customer} />
                )}
                {/* {/* <span>Profile Img</span>
      <input type="file" onChange={(e) => onImageChange(e)} value={file}></input>  
        */}
            </div>
        </div>
    )
}

export default CustomerProfile
