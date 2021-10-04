import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.scss';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const OrderDetails = () => {

  const customer = useSelector(state => state.userLogin.text.user);
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [placedOrders, setPlacedOrders] = useState([]);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.post('http://localhost:3001/get-orders', {
      custId: customer
    })
      .then((res) => {
        console.log(res.data);
        setDeliveredOrders(() => res.data.filter((el) => el.orderStatus == 2))
        console.log(deliveredOrders);
        setPlacedOrders(() => res.data.filter((el) => el.orderStatus == 1))
      })
  }, [])
  return (
    <div className={styles.OrderDetails} data-testid="OrderDetails">
      {placedOrders.length}
    </div>
  )
};

OrderDetails.propTypes = {};

OrderDetails.defaultProps = {};

export default OrderDetails;
