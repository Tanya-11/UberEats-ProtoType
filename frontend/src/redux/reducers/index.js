import {
    userSignupReducer,
    restLoginReducer,
    userLoginReducer,
    restSignupReducer,
    OrderCountReducer
} from "./reducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userSignUp: userSignupReducer,
    restSignUp: restSignupReducer,
    restLogin: restLoginReducer,
    userLogin: userLoginReducer,
    cart: OrderCountReducer
});

export default allReducers;