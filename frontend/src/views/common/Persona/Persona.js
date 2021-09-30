import React from 'react';
import styles from './Persona.module.scss';
import { useHistory } from 'react-router-dom'

const Persona = () => {
  const history = useHistory();
  const goToRest = () => {
    history.push({
      pathname: '/restOwner-login',
      state: { user: 'restaurant' }
    }
    )
  }

  const goToUser = () => {
    history.push({
      pathname: '/user-login',
      state: { user: 'user' }
    }
    )
  }
  return (
    <div className={styles.Persona} data-testid="Persona">
      <h1 onClick={() => { history.push('/restaurant-login') }}>
        Rest owner
      </h1>
      <h1 onClick={() => { history.push('/user-login') }}>
        User
      </h1>
    </div>
  )
};


export default Persona;
