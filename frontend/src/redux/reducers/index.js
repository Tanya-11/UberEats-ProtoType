import {
    userSignupReducer,
    restLoginReducer,
    userLoginReducer,
    restSignupReducer,
    orderCountReducer,
} from "./reducers";
import { combineReducers } from "redux";
import * as ACTIONS from './../actions/actions';

const appReducer = combineReducers({
    userSignUp: userSignupReducer,
    restSignUp: restSignupReducer,
    restLogin: restLoginReducer,
    userLogin: userLoginReducer,
    cart: orderCountReducer,
});

const rootReducer = (state, action) => {
    if (action.type === ACTIONS.USER_LOGOUT) {
        localStorage.removeItem('persist:root');
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;