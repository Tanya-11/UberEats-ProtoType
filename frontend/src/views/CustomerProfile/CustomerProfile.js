import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomerProfile.module.scss';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import RestCard from '../common/RestCard'
import { useHistory } from 'react-router';

const CustomerProfile = () => {
  // const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const history = useHistory();
  // // const [dob, setDOB] = useState('');
  // const [email, setEmail] = useState('');
  // const [phoneNo, setPhoneNo] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [country, setCountry] = useState('')
  const customer = useSelector(state => state.userLogin.text.user);
  Axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState({
    name: '',
    email: customer,
    phone: '',
    city: '',
    state: '',
    country: ''
  });
  const [showAbout, setShowAbout] = useState(false)

  const [restData, setRestData] = useState([])

  useEffect(() => {
    getCustomerData();
    getFavRestaurant();
  }, [])

  const getCustomerData = () => {
    Axios.post('http://localhost:3001/get-profile', {
      custId: customer
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
      custId: customer
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      })
  }

  const getFavRestaurant = () => {
    const response = Axios.post('http://localhost:3001/get-favorites', {
      email: customer
    });
    response
      .then((res) => {
        let data = [];
        res.data.forEach((el) => {
          data.push(Axios.post('http://localhost:3001/get-rest-fav', {
            restId: el.restId
          }))
        });
        data.forEach(el => {
          el.then(res => {
            console.log(res);
            res.data[0]['fav'] = true
            setRestData(prev => [...prev, res.data[0]]);
          })
        })

      })
      .catch(err => {
        throw err;
      })
  }


  const onImageChange = (event) => {
    console.log(event.target.files[0]);
    // if (event.target.value) {
    //   setFile(
    //     URL.createObjectURL(event.target.value)
    //   );
    // }
  }

  const handleChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    // const
    setUserData(prevSate => ({
      ...prevSate,
      [name]: value,
    }))
    console.log(userData);
  }

  return (
    <div className={styles.CustomerProfile} data-testid="CustomerProfile">
      <div className={styles.leftContent}>
        <ul>
          <li
          // onClick={setShowAbout(!showAbout)}
          >About</li>
          <li>Favorites</li>
        </ul>
      </div>
      {!showAbout && <div className={styles.rightContent}>
        {/* <span>Profile Img</span>
      <input type="file" onChange={(e) => onImageChange(e)} value={file}></input> */}

        <label>Name:
          <input type="text" name="name" onChange={(e) => handleChange(e)} value={userData.name}></input>
        </label>
        {/* 
      <span>DOB</span>
      <input type="text" onChange={setDOB} value={dob}></input> */}

        <label>Email
          <input type="text" name="email" onChange={(e) => handleChange(e)} value={userData.email}></input>
        </label>
        <label>Phone
          <input type="number" name="phone" onChange={(e) => handleChange(e)} value={userData.phone}></input>
        </label>
        <label>City
          <input type="text" name="city" onChange={(e) => handleChange(e)} value={userData.city}></input>
        </label>
        <label>State
          <input type="text" name="state" onChange={(e) => handleChange(e)} value={userData.state}></input>
        </label>
        <label>Country
          <input name="country" onChange={(e) => handleChange(e)} value={userData.country}></input>
        </label>
        <button type="submit" onClick={submitCustomerData}>Save Changes</button>
        {
          restData.map((result, i) => (
            <RestCard key={i} data={result} onClick={() => { history.push('/dashboard') }}></RestCard>
          ))
        }
      </div >
      }
    </div >
  );
}



export default CustomerProfile;
