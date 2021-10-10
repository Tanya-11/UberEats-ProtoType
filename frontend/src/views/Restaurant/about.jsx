import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import './rest-profile.scss'
import { Button } from 'react-bootstrap'

const About = () => {
    const restaurant = useSelector((state) => state.restLogin.text.user)
    const [startOpenHrs, setStartOpenHrs] = useState('00:00:00')
    const [endOpenHrs, setEndOpenHrs] = useState('00:00:00')
    const [restData, setRestData] = useState({
        restName: '',
        restId: restaurant,
        phoneNo: '',
        addressLine: '',
        city: '',
        state: '',
        country: '',
        description: '',
        openHrs: `${startOpenHrs} - ${endOpenHrs}`,
        deliveryMode: '',
    })
    const [changed, setChanged] = useState(false)
    const [openHrsMsg, setOpenHrsMsg] = useState(
        'The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999'
    )

    useEffect(() => {
        getRestData()
    }, [])
    const getRestData = () => {
        Axios.post('http://localhost:3001/get-rest-data', {
            restId: restaurant,
        })
            .then((res) => {
                console.log(res)
                console.log(res.data[0])
                setRestData({
                    restName: res.data[0].restName,
                    restId: restaurant,
                    phoneNo: res.data[0].phoneNo,
                    addressLine: res.data[0].addressLine,
                    city: res.data[0].city,
                    state: res.data[0].state,
                    country: res.data[0].country,
                    description: res.data[0].description,
                    openHrs: res.data[0].openHrs,
                    deliveryMode: res.data[0].deliveryMode,
                })
                console.log(typeof res.data[0].openHrs.split('-')[0])
                setStartOpenHrs(res.data[0].openHrs.split(' - ')[0])
                setEndOpenHrs(res.data[0].openHrs.split(' - ')[1])

                localStorage.setItem('deliveryMode', res.data[0].deliveryMode)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (event) => {
        console.log(startOpenHrs)
        event.preventDefault()
        setChanged(true)
        console.log(event.target.value)
        const { name, value } = event.target
        console.log(name)
        console.log(value)
        console.log(restData)
        setRestData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        console.log(restData)
    }

    const handleChangeOpenHrs = (e) => {
        setChanged(true)
        if (e.name === 'startOpenHrs') setStartOpenHrs(e.value)
        if (e.name === 'endOpenHrs') {
            if (e.value > startOpenHrs) {
                setEndOpenHrs(e.value)
                setRestData((prevState) => ({
                    ...prevState,
                    openHrs: `${startOpenHrs} - ${endOpenHrs}`,
                }))
            } else {
                setEndOpenHrs(0)
                setOpenHrsMsg('End Hrs should be greater than Start Hr')
            }
        }
        console.log(startOpenHrs)
        console.log(endOpenHrs)
        console.log(restData)
    }

    const submitRestaurantData = () => {
        Axios.post('http://localhost:3001/set-rest-data', {
            restData,
        })
            .then((res) => {
                console.log(res)
                localStorage.setItem('deliveryMode', restData.deliveryMode)
                // console.log(restName);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="rightContent">
            <label className="label">
                Name:
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={restData.restName}
                ></input>
            </label>
            <label className="label">
                Email
                <input
                    type="text"
                    name="restId"
                    onChange={(e) => handleChange(e)}
                    value={restData.restId}
                ></input>
            </label>
            <label className="label">
                Phone
                <input
                    type="number"
                    name="phoneNo"
                    onChange={(e) => handleChange(e)}
                    value={restData.phoneNo}
                ></input>
            </label>
            <label className="label">
                Address
                <input
                    name="addressLine"
                    onChange={(e) => handleChange(e)}
                    value={restData.addressLine}
                ></input>
            </label>
            <label className="label">
                City
                <input
                    type="text"
                    name="city"
                    onChange={(e) => handleChange(e)}
                    value={restData.city}
                ></input>
            </label>
            <label className="label">
                State
                <input
                    type="text"
                    name="state"
                    onChange={(e) => handleChange(e)}
                    value={restData.state}
                ></input>
            </label>
            <label className="label">
                Country
                <input
                    name="country"
                    onChange={(e) => handleChange(e)}
                    value={restData.country}
                ></input>
            </label>
            <label className="label">
                Description
                <input
                    name="description"
                    onChange={(e) => handleChange(e)}
                    value={restData.description}
                ></input>
            </label>
            <label className="label">
                Opening Hrs
                <input
                    type="time"
                    name="startOpenHrs"
                    onChange={(e) => handleChangeOpenHrs(e.target)}
                    value={startOpenHrs}
                ></input>
                <input
                    type="time"
                    name="endOpenHrs"
                    onChange={(e) => handleChangeOpenHrs(e.target)}
                    value={endOpenHrs}
                ></input>
            </label>
            <div className="mode" onChange={(e) => handleChange(e)}>
                <label className="label">
                    Mode:
                    <label>
                        <input
                            type="radio"
                            value="delivery"
                            name="deliveryMode"
                            checked={restData.deliveryMode === 'delivery'}
                        />
                        Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="pick"
                            name="deliveryMode"
                            checked={restData.deliveryMode === 'pick'}
                        />
                        Pick Up
                    </label>
                </label>
            </div>
            {/* <label>Delivery Mode:
                <input type="radio" name="deliveryMode"
                    value='delivery'
                    onChange={(e) => handleChangeDeliveryMode(e)}
                    checked={restData.deliveryMode === 'delivery'}
                /> Delivery
                <input type="radio" name="deliveryMode"
                    value='pick'
                    onChange={(e) => handleChangeDeliveryMode(e)}
                    checked={restData.deliveryMode === 'pick'}
                /> Pick Up
                {/* <input name="deliveyMode" onChange={(e) => handleChange(e)} value={restData.deliveryMode}></input> 
            </label> }*/}
            <Button
                variant="primary"
                type="submit"
                className="submit-button"
                disabled={!changed}
                onClick={submitRestaurantData}
            >
                Save Changes
            </Button>
        </div>
    )
}

export default About
