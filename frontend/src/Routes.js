import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from './views/auth/LogInPage';
import SignUpPage from './views/auth/SignUpPage';
import Dashboard from './views/dashboard/Dashboard'
import { PrivateRoute } from './auth/PrivateRoute';
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail';

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
                <Route path='/dashboard' exact>
                    <Dashboard></Dashboard>
                </Route>
                <Route path='/dashboard/restaurant-details'>
                    <RestCardDetail />
                </Route>
            </Switch>
        </Router>
    );
}

// auth={false}