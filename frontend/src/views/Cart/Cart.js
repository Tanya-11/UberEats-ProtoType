import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import {
  userOrderPlaced
} from '../../redux/actions/actions';
import Orders from '../Restaurant/orders';

const Cart = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const orders = useSelector(state => state.cart);
  const customer = useSelector(state => state.userLogin.text.user);
  const [cartStatus, setCartStatus] = useState('Cart is Empty');
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [restName, setRestName] = useState('');
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');



  useEffect(() => {
    console.log("calcul", orders);
    let total = 0;
    if (orders.length > 0)
      setRestName(orders[0].restName)
    for (var i = 0; i < orders.length; i++) {

      total = total + (orders[i].price * orders[i].text);
      setTotal(total)
    }

    getAddr();
  }, [])


  const getAddr = () => {
    Axios.post('http://localhost:3001/get-address', {
      custId: customer
    })
      .then((res) => {
        console.log((res.data[0]));
        setAddr1(res.data[0].address1);
        setAddr2(res.data[0].address2)
      })
      .catch((err) => {
        throw err;
      })
  }
  const setAddr = () => {
    console.log('ss' + addr2);
    Axios.post('http://localhost:3001/set-address', {
      address1: addr1,
      address2: addr2,
      custId: customer
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      })
  }
  const placeOrder = async () => {
    setOrderPlaced(true);
    let res = [];

    for (var i = 0; i < orders.length; i++) {
      // total += (+orders[i].price * orders.text[i]);
      res.push(await Axios.post('http://localhost:3001/place-orders', {
        orderStatus: 0,
        custId: customer,
        dishId: orders[i].dishId,
        dishName: orders[i].dishName,
        restId: orders[i].restId,
        quantity: orders[i].text,
        price: orders[i].price,
        date: new Date()
      }))
    }
    for (var i = 0; i < res.length; i++) {
      if (res[i].status == 200) {
        console.log('Order Updated');
      }
      else console.log(`error in placing order for ${i}`);
    }
    setCartStatus('Order Placed')

    dispatch(userOrderPlaced([]))
  }

  return (
    <div className={styles.Cart} data-testid="Cart">
      {/* orders.length>0 && */}
      {

        !orderPlaced && orders.length > 0 && (
          <div>
            <div className={styles.restName}>{restName}</div>
            <table class={styles.orders}>

              <thead>
                <tr class={styles.ordersRow}>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} class={styles.ordersRow}>

                    <td>{order.text}</td>
                    <td>{order.dishName}</td>
                    <td>${order.text * (+order.price)}</td>
                  </tr>
                ))}
                <tr style={styles.total}>
                  <td>Total</td>
                  <td />
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
            <div className=
              {styles.addr}>
              <span>Address 1:<input type="text" value={addr1}
                onChange={(e) => { setAddr1(e.target.value) }} /></span>
              <span>Address 2:<input type="text" value={addr2}
                onChange={(e) => { setAddr2(e.target.value) }} /></span>
              <button type="submit" onClick={setAddr}>Save Address</button>
            </div>
          </div>)
      }
      {
        orderPlaced && (<h2>{cartStatus}</h2>)
      }

      {
        !orderPlaced && orders.length > 0 && (<button onClick={placeOrder}>Place Order</button>)
      }
    </div >
  )
};


export default Cart;
