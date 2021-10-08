import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './OrderDetails.scss'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import ActiveOrders from './active-orders'
import PastOrders from './past-orders'
const OrderDetails = () => {
    const customer = useSelector((state) => state.userLogin.text.user)
    const [orders, setOrders] = useState([])
    const [pastOrders, setPastOrders] = useState([])
    const [activeOrders, setActiveOrders] = useState([])
    Axios.defaults.withCredentials = true
    const [index, setIndex] = useState(0)
    useEffect(() => {
        Axios.post('http://localhost:3001/get-orders-receipt', {
            email: customer,
        }).then((res) => {
            console.log(res.data)
            let active = []
            let past = []
            res.data.forEach((el) => {
                if (el.orderStatus === 2 || el.orderStatus === 5) {
                    past.push(el)
                } else active.push(el)
            })
            setPastOrders(past)
            setActiveOrders(active)
        })
    }, [])

    const submit = () => {
        console.log(pastOrders)
    }
    return (
        <div className="customer-orders">
            <div className="left-content">
                <ul>
                    <li onClick={() => setIndex(0)}>Past Orders</li>
                    <li onClick={() => setIndex(1)}>Active Orders</li>
                </ul>
            </div>
            <div className="right-content">
                {index === 0 && pastOrders.length > 0 && <ActiveOrders data={pastOrders} />}
                {index === 1 && <ActiveOrders data={activeOrders} />}
            </div>
            {/* <button onClick={submit}></button> */}
        </div>
    )
}

export default OrderDetails
