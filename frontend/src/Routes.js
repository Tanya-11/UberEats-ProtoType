import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoginPage } from './views/auth/LogInPage'
import SignUpPage from './views/auth/SignUpPage'
import Dashboard from './views/dashboard/Dashboard'
import PrivateRoute from './auth/PrivateRoute';
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail'
import { DashRoutes } from './views/dashboard/DashRoutes';
import Header from './views/dashboard/Header';
import Persona from './views/common/Persona/Persona';
import OrderDetails from './views/OrderDetails/OrderDetails'
export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Persona></Persona>
                </Route>
                <Route path="/user-login" exact>
                    <LoginPage data={'customer'}></LoginPage>
                </Route>
                {/* <PrivateRoute path="/restaurant-login"
                    component={LoginPage}></PrivateRoute> */}
                <Route path="/restaurant-login" exact>
                    <LoginPage data={'restaurant'}></LoginPage>
                </Route>
                <Route path="/user-signup" exact>
                    <SignUpPage data={'customer'}></SignUpPage>
                </Route>
                <Route path="/restaurant-signup" exact>
                    <SignUpPage data={'restaurant'}></SignUpPage>
                </Route>
                <PrivateRoute path="/dashboard">
                    <Header />
                    <DashRoutes></DashRoutes>
                </PrivateRoute>
                <PrivateRoute path="/orderDetails">
                    <Header />
                    <OrderDetails></OrderDetails>
                </PrivateRoute>
                {/* <Route path="/dashboard">
                    <Header />
                    <DashRoutes></DashRoutes>
                </Route> */}
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    )
}
function NotFound() {
    return <>You have landed on a page that doesn't exist</>;
}

// auth={false}
