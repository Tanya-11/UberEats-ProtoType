import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './RestDishCard.module.scss';
import AddIcon from '@mui/icons-material/Add';
import localStorage from 'redux-persist/es/storage';
const RestDishCard = (props) => {
  const [order, setOrder] = useState(() => {
    return localStorage.getItem('order') || [];
  });

  const addToCart = () => {
    console.log("clcik", props.data);
    //setOrder(prev => [...prev, props.data]);
    localStorage.setItem('order', JSON.stringify(order));
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

RestDishCard.propTypes = {};

RestDishCard.defaultProps = {};

export default RestDishCard;
