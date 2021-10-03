import React, { useEffect, useState } from 'react';
import styles from './OrderDetails.module.scss';
import { useSelector } from 'react-redux';
import Axios from 'axios';
const OrderDetails = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const order = useSelector(state => state.cart);
  useEffect(() => {
    console.log('Order', order);
  }, [])

  const placeOrder = () => {
    setOrderPlaced(true);
    Axios.post('http://localhost:3001/place-orders', {
      orderId: 1,
      orderStatus: 1,
      custId: 1,
      dishId: 1,
      quantity: 1,
    })
      .then((res) => {
        console.log('placed successfully');
      })
      .catch((err) => {
        throw err;
      })
  }

  return (
    <div className={styles.OrderDetails} data-testid="OrderDetails">
      {
        !orderPlaced && (
          <div>
            <table>
              <tr>
                <th>Quantity</th>
                <th>Name</th>
              </tr>

              {order.map((el, index) => (
                <tr>
                  <td key={index}>{el.dishId}</td>
                  <td key={index}>{el.orderCount}</td>
                </tr>
              ))}
            </table>

            <input type="text"></input>

            <input type="text"></input></div>)
      }
      {
        orderPlaced && (<h2>Order Placed</h2>)
      }


      <button
        onClick={placeOrder}>Place Order</button>
    </div>
  )
};


export default OrderDetails;
