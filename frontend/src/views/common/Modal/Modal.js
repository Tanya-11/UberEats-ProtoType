import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import * as ACTIONS from '../../../redux/actions/actions'
import styles from './Modal.module.scss'

const Modal = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const logOut = () => {
        // history.push('/');
        dispatch({ type: ACTIONS.USER_LOGOUT })
    }
    return (
        <div className={styles.Modal} data-testid="Modal">
            <ul>
                <li
                    onClick={() => {
                        history.push('/customer-profile')
                    }}
                >
                    Profile
                </li>
                <hr />
                <li
                    onClick={() => {
                        history.push('/dashboard/order-details')
                    }}
                >
                    Orders
                </li>
                <hr />
                <li onClick={logOut}>
                    Log Out <LogoutIcon />
                </li>
            </ul>
        </div>
    )
}

export default Modal
