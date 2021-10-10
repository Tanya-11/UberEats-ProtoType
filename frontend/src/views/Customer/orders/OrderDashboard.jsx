import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Orders.scss'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Orders from './Orders'

const OrderDetails = () => {
    const customer = useSelector((state) => state.userLogin.text.user)
    const [orders, setOrders] = useState([])
    const [pastOrders, setPastOrders] = useState([])
    const [activeOrders, setActiveOrders] = useState([])
    Axios.defaults.withCredentials = true
    const [index, setIndex] = useState(0)
    useEffect(() => {
        Axios.post('/get-orders-list', {
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
                {index === 0 && pastOrders.length > 0 && <Orders data={pastOrders} />}
                {index === 1 && <Orders data={activeOrders} />}
            </div>
        </div>
    )
}

export default OrderDetails
