import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router'
import { About } from '../Customer/profile/About'
import { Favorites } from '../Customer/profile/Favourites'
import { Table, Button } from 'react-bootstrap'
import * as moment from 'moment'

const CompleteOrders = () => {
    const restaurant = useSelector((state) => state.restLogin.text.user)
    // const [activeOrders, setActiveOrders] = useState([
    //     {
    //         orderId: 0,
    //         custId: '',
    //         orderStatus: 0,
    //         orderStatusName: '',
    //         dishName: '',
    //         dishId: 0,
    //         quantity: 0,
    //         price: 0,
    //     },
    // ])
    const [completedOrders, setCompletedOrders] = useState([
        {
            custId: '',
            orderStatus: 0,
            orderStatusName: '',
            dishName: '',
            dishId: 0,
            quantity: 0,
            price: 0,
        },
    ])
    const [btnDisabled, setBtnDisabled] = useState(true)
    const history = useHistory()
    const [userInfo, setUserInfo] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [orders, setOrders] = useState([])
    const getOrders = Axios.post('/get-orders', {
        email: restaurant,
        user: 'restId',
    })
    const getOrderStatus = Axios.get('/get-orderStatus')
    const deliveryMode = localStorage.getItem('deliveryMode')

    useEffect(() => {
        Promise.all([getOrders, getOrderStatus])
            .then((res) => {
                res[0].data.map((el) => {
                    res[1].data.map((item) => {
                        if (el.orderStatus === item.orderStatusId) {
                            el['orderStatusName'] = item.orderStatusTitle
                        }
                    })
                })
                setCompletedOrders(
                    res[0].data.filter((el) => el.orderStatus == 2 || el.orderStatus == 5)
                )

                if (deliveryMode == 'delivery') {
                    res[1].data.splice(4, 2)
                    setOrders(res[1].data)
                    //  res[1].data.splice(5, 1);
                } else if (deliveryMode === 'pick') {
                    res[1].data.splice(2, 2)
                    setOrders(res[1].data)
                }
            })
            .catch((err) => {
                throw err
            })
    }, [])

    const showUserInfo = (custId, isClicked) => {
        console.log('clcikwd' + isClicked)
        setIsClicked(isClicked)
        if (isClicked) setUserInfo(custId)
    }
    const handleChangeCompleteOrders = (event, index) => {
        console.log(completedOrders)
        setBtnDisabled(false)
        event.preventDefault()
        let arr = completedOrders.slice()
        let order = orders.filter((el) => el.orderStatusId === parseInt(event.target.value))
        arr[index].orderStatus = order[0]?.orderStatusId
        arr[index].orderStatusName = order[0]?.orderStatusTitle
        //  newOrderStatus.push(arr[index]);
        console.log(arr[index])
        // console.log(newOrderStatus);
        console.log(arr[index]?.orderStatusName)
        setCompletedOrders(arr)
    }

    const submit = async () => {
        let res = []
        for (var i = 0; i < completedOrders.length; i++) {
            // total += (+orders[i].price * orders.text[i]);
            console.log(completedOrders[i].orderStatusId)
            res.push(
                await Axios.post('/set-order-status', {
                    orderId: completedOrders[i].orderId,
                    orderStatus: completedOrders[i].orderStatus,
                    date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                })
            )
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].status == 200) {
                console.log('Order Updated')
            } else console.log(`error in placing order for ${i}`)
        }

        console.log(completedOrders)
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <td>User</td>
                        <td>Order Status</td>
                        <td>Dish Name</td>
                        <td>Quantity</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {completedOrders.length > 0 &&
                        completedOrders.map((el, index) => (
                            <tr key={index}>
                                <td onClick={() => showUserInfo(el.custId, !isClicked)}>
                                    <a>{el.custId}</a>
                                </td>
                                <td>
                                    <select
                                        value={el.orderStatus}
                                        onChange={(e) => handleChangeCompleteOrders(e, index)}
                                    >
                                        {orders.map((item, i) => (
                                            <option
                                                key={i}
                                                name="orderStatus"
                                                value={item.orderStatusId}
                                            >
                                                {item.orderStatusTitle}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td> {el.dishName}</td>
                                <td> {el.quantity}</td>
                                <td> {el.price}</td>
                            </tr>
                        ))}
                    <tr></tr>
                </tbody>
            </Table>
            <Button variant="primary" onClick={submit} disabled={btnDisabled}>
                Save Changes
            </Button>

            {isClicked && (
                <>
                    <About data={userInfo} disabled={true}></About>
                    <hr />
                    <Favorites data={userInfo} />
                </>
            )}
        </div>
    )
}

export default CompleteOrders
