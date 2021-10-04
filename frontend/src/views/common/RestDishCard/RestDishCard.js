import React, { useEffect, useState } from 'react';
import styles from './RestDishCard.module.scss';
import AddIcon from '@mui/icons-material/Add';
import {
  userOrderIncrement
} from '../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';




const RestDishCard = (props) => {
  // const [resltName, setRestName]=useState('');
  const orders = useSelector(state => state.cart);
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch();
  const addToCart = () => {


    if (orders.length > 0 && orders[0].restId === props.data.restName) {
      dispatch(userOrderIncrement(
        {
          text: 1,
          dishId: props.data.dishId,
          dishName: props.data.dishName,
          restId: props.data.restId,
          restName: props.data.restName,
          price: props.data.price
        }
      ));
    } else {
      setErrorMsg(`Your Order contains items from ${orders[0].restName}, Want to Create a new Order from ${props.data.restName}`)
    }
  }
  return (
    <div className={styles.RestDishCard}
      data-testid="RestDishCard"
    >
      {
        <span>{errorMsg}</span>
      }
      <div className={styles.RestDishCardWrapper}>
        <div className={styles.dishImage}>
          <div className={styles.dishAddIcon}
            onClick={addToCart}>
            <AddIcon />
          </div>
        </div>
        <div className={styles.dishDetail}>
          <div><em>{props.data.dishName}</em></div>
          <div>{props.data.ingredients}</div>
          <div>${props.data.price}</div>

        </div>
      </div>



    </div>
  )
};

export default RestDishCard;
