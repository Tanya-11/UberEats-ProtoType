import {
    signupReducer,
    restLoginReducer,
    userLoginReducer
} from "./reducers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    signUp: signupReducer,
    restLogin: restLoginReducer,
    userLogin: userLoginReducer
});

export default allReducers;