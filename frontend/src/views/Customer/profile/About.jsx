import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import './CustomerProfile.scss'
export const About = (props) => {
    const [changed, setChanged] = useState(false)
    const history = useHistory()
    const customer = useSelector((state) => state.userLogin.text.user)
    Axios.defaults.withCredentials = true
    const [userData, setUserData] = useState({
        name: '',
        email: props.data,
        phone: '',
        city: '',
        state: '',
        country: '',
        nickName: '',
    })
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    useEffect(() => {
        getCustomerData()
    }, [])

    const getCustomerData = () => {
        Axios.post('/get-profile', {
            custId: props.data,
        })
            .then((res) => {
                console.log(res)
                if (res.data && res.data[0]) {
                    setUserData(
                        {
                            name: res.data[0].name || '',
                            email: res.data[0].email || '',
                            phone: res.data[0].phone || '',
                            city: res.data[0].city || '',
                            state: res.data[0].state || '',
                            country: res.data[0].country || '',
                            nickName: res.data[0].nickName || '',
                        },
                        setImage(res.data[0].image)

                        //  email: res.data[0].email
                    )
                    console.log('user' + JSON.stringify(userData))
                    // setName(res.data[0].name);
                    // setEmail(res.data[0].email);
                    // setPhoneNo(res.data[0].phone);
                    // setCity(res.data[0].city);
                    // setCountry(res.data[0].country);
                    // setState(res.data[0].state);
                }
            })
            .catch((err) => {
                throw err
            })
    }

    const submitCustomerData = () => {
        console.log('hI')
        const formData = new FormData()
        formData.append('image', file)
        formData.append('custId', customer)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        const setProfile = Axios.post('/set-profile', {
            ...userData,
            custId: customer,
        })
        const setPhoto = Axios.post('http://3.19.240.173:3001/upload-pic', formData, config)
        Promise.all([setProfile, setPhoto])

            .then((res) => {
                console.log(res)
                setImage(res[1].data)
            })
            .catch((err) => {
                throw err
            })
    }
    const handleChange = (e) => {
        console.log(e.target.name)
        const { name, value } = e.target
        // const
        setChanged(true)
        setUserData((prevSate) => ({
            ...prevSate,
            [name]: value,
        }))
        console.log(userData)
    }

    const uploadImage = (event) => {
        console.log(event.target.files)
    }
    const submit = async (event) => {
        event.preventDefault()
        console.log(file)
        const formData = new FormData()
        formData.append('image', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        let file1 = 'de4686e7f6ed29af7a592ddb6335ec62'
        //  const result = await Axios.post('http://3.19.240.173:3001/upload-pic', formData, config)
        //  setImage(result.data.imagePath)
        //  setImage('image/3fe4ee4f70dfcfc6cf0fc7acb09ea0f5')
        const result = await Axios.get('http://3.19.240.173:3001/fetch-file')
        console.log(result.data[0])
        setImage(result.data[1].image)
        // console.log(res);
        // setImage(res.data)
        // console.log(formData);
    }

    return (
        <div>
            {image && (
                <img
                    style={{
                        width: '100px',
                        height: '100px',
                        display: 'inline',
                        margin: '12%',
                        float: 'right',
                    }}
                    src={`http://3.19.240.173:3000/${image}`}
                />
            )}
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.name}
                ></input>
            </label>
            {/* 
      <span>DOB</span>
      <input type="text" onChange={setDOB} value={dob}></input> */}

            <label>
                Email
                <input
                    type="text"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.email}
                ></input>
            </label>
            <label>
                Nick Name
                <input
                    type="text"
                    name="nickName"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.nickName}
                ></input>
            </label>
            <label>
                Phone
                <input
                    type="number"
                    name="phone"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.phone}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                ></input>
            </label>
            <label>
                City
                <input
                    type="text"
                    name="city"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.city}
                ></input>
            </label>
            <label>
                State
                <input
                    type="text"
                    name="state"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.state}
                ></input>
            </label>
            <label>
                Country
                <input
                    name="country"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.country}
                ></input>
            </label>
            <input
                type="file"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
            />
            {/* <button type="submit">Submit</button> */}
            {!props.disabled && (
                <button type="submit" disabled={!changed} onClick={submitCustomerData}>
                    Save Changes
                </button>
            )}
            {/* </form> */}
        </div>
    )
}
