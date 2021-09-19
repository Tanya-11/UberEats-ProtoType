import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from './views/login/LogInPage';
import SignUpPage  from './views/login/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoute';

export const Routes = () => {
    return (
        <Router>
            <Switch>
               <Route path="/login" exact>
                   <LoginPage></LoginPage>
                </Route>
                <Route path="/signup" exact >
                <SignUpPage></SignUpPage>
                </Route>              
            </Switch>
        </Router>
    );
}

// auth={false}