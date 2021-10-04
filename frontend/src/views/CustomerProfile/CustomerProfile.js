import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomerProfile.module.scss';

const CustomerProfile = () => (
  <div className={styles.CustomerProfile} data-testid="CustomerProfile">
    <div>
      <ul>
        <li>About</li>
        <li>Favorites</li>
      </ul>
    </div>

    <span>Profile Img</span>
    <input value={ }></input>

    <span>Name</span>
    <input value={ }></input>

    <span>DOB</span>
    <input value={ }></input>

    <span>EMAIL</span>
    <input value={ }></input>

    <span>Phone No</span>
    <input value={ }></input>

    <span>CITY</span>
    <input value={ }></input>

    <span>STATE</span>
    <input value={ }></input>

    <span>COUNTRY</span>
    <input value={ }></input>
  </div>
);



export default CustomerProfile;
