import React, { useEffect, useState } from 'react';
import styles from './RestDishCard.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { userOrderIncrement, userOrderdecrement } from '../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';




const RestDishCard = (props) => {

  const dispatch = useDispatch();
  //let [countOrder, setCountOrder] = useState(0);
  //let countOrder = useSelector(state => state.cart);
  // const [order, setOrder] = useState(() => {
  //   // return localStorage.getItem('order') || [];
  //   countOrder = useSelector(state => state.orderCount);
  // });


  const addToCart = () => {
    console.log("clicklk", props);
    //setCountOrder(c++){ orderCount, DishId}
    // console.log("co", countOrder);
    dispatch(userOrderIncrement(
      props.data.dishId
    ));

    //setOrder(prev => [...prev, props.data]);
    // localStorage.setItem('order', JSON.stringify(order));
  }
  return (
    <div className={styles.RestDishCard}
      data-testid="RestDishCard"
    >
      <div className={styles.RestDishCardWrapper}>
        <div className={styles.dishImage}>
          <div className={styles.dishAddIcon}
            onClick={addToCart}>
            <AddIcon />
          </div>
          {/* <div>{order.dishName}</div> */}
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
