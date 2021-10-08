import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { useHistory } from 'react-router';

import './CustomerProfile.scss';
export const About = (props) => {

    const [changed, setChanged] = useState(false);
    const history = useHistory();
    // const customer = useSelector(state => state.userLogin.text.user);
    Axios.defaults.withCredentials = true;
    const [userData, setUserData] = useState({
        name: '',
        email: props.data,
        phone: '',
        city: '',
        state: '',
        country: ''
    });

    useEffect(() => {
        getCustomerData();
    }, [])

    const getCustomerData = () => {
        Axios.post('http://localhost:3001/get-profile', {
            custId: props.data
        })
            .then((res) => {
                console.log(res);
                if (res.data && res.data[0]) {
                    setUserData({
                        name: res.data[0].name || '',
                        email: res.data[0].email || '',
                        phone: res.data[0].phone || '',
                        city: res.data[0].city || '',
                        state: res.data[0].state || '',
                        country: res.data[0].country || ''
                    }


                        //  email: res.data[0].email
                    )
                    console.log('user' + JSON.stringify(userData));
                    // setName(res.data[0].name);
                    // setEmail(res.data[0].email);
                    // setPhoneNo(res.data[0].phone);
                    // setCity(res.data[0].city);
                    // setCountry(res.data[0].country);
                    // setState(res.data[0].state);
                }
            })
            .catch(err => {
                throw err;
            })
    }

    const submitCustomerData = () => {
        Axios.post('http://localhost:3001/set-profile', {
            ...userData,
            custId: props.data
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                throw err;
            })
    }
    const handleChange = (e) => {
        console.log(e.target.name);
        const { name, value } = e.target;
        // const
        setChanged(true);
        setUserData(prevSate => ({
            ...prevSate,
            [name]: value,
        }))
        console.log(userData);
    }

    return (

        <div>
            {/* <span>Profile Img</span>
      <input type="file" onChange={(e) => onImageChange(e)} value={file}></input> */}

            <label>Name:
                <input type="text" name="name" onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.name}></input>
            </label>
            {/* 
      <span>DOB</span>
      <input type="text" onChange={setDOB} value={dob}></input> */}

            <label>Email
                <input type="text" name="email" onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.email}></input>
            </label>
            <label>Phone
                <input type="number" name="phone" onChange={(e) => handleChange(e)} disabled={props.disabled}
                    value={userData.phone}></input>
            </label>
            <label>City
                <input type="text" name="city" onChange={(e) => handleChange(e)} disabled={props.disabled}
                    value={userData.city}></input>
            </label>
            <label>State
                <input type="text" name="state" onChange={(e) => handleChange(e)} disabled={props.disabled}
                    value={userData.state}></input>
            </label>
            <label>Country
                <input name="country" onChange={(e) => handleChange(e)} disabled={props.disabled}
                    value={userData.country}></input>
            </label>
            {!props.disabled &&
                <button type="submit" disabled={!changed}
                    onClick={submitCustomerData}>Save Changes</button>
            }

        </div >

    )
}