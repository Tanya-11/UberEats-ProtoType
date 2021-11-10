import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = (restOfProps) => {
    const userLoginStatus = useSelector((state) => state.userLogin)
    const restLoginStatus = useSelector((state) => state.restLogin)
    const isAuth = userLoginStatus.isLoggedIn || restLoginStatus.isLoggedIn

    return isAuth ? <Route {...restOfProps}></Route> : <Redirect to="/" />
}

export default PrivateRoute
