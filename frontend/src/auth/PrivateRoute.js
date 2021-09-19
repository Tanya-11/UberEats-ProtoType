// import React from "react";
// import { Redirect, Route } from "react-router-dom";

// export const PrivateRoute = props => {
//     const user = null;
//     return  user ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
//     (<Redirect  to="/login"  />);
// };

import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
export const  PrivateRoute = (props) => {

    const condition = false;
    return  condition ? (<Route {...props} />): (<Redirect to="/login"/>);
};
