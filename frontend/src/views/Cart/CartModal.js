import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import './CartModal.scss';
const CartModal = () => {
    const orders = useSelector(state => state.cart);
    const history = useHistory();
    useEffect(() => {
        console.log('orders' + orders.length);
    })


    return (
        <div>
            {
                orders.length > 0 && (
                    <div className="cart-wrapper">
                        <table>

                            <thead>
                                <tr>
                                    <th>Quantity</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>

                                        <td>{order.text}</td>
                                        <td>{order.dishName}</td>
                                        <td>{order.text * (+order.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                orders.length === 0 &&
                <div className="cart-wrapper">
                    {/* <span className="close">X</span> */}
                    <span className="text">No Items in Cart
                    </span>
                </div>
            }
        </div>
    )
}


export default CartModal;