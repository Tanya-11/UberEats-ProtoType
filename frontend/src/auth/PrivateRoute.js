// import React from "react";
// import { Redirect, Route } from "react-router-dom";

// export const PrivateRoute = props => {
//     const user = null;
//     return  user ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
//     (<Redirect  to="/login"  />);
// };

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (restOfProps) => {
    //const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userLoginStatus = useSelector(state => state.userLogin);
    const restLoginStatus = useSelector(state => state.restLogin);
    const isAuth = userLoginStatus.isLoggedIn || restLoginStatus.isLoggedIn
    //|| restLoginStatus.isLoggedIn;
    console.log("this", isAuth);
    console.log("restLoginStatus", restLoginStatus);
    console.log("userLoginStatus", userLoginStatus);

    return (
        isAuth ?
            <Route {...restOfProps}>
            </Route>
            :
            <Redirect to="/" />
    );
}

export default PrivateRoute;

