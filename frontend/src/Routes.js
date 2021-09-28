import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoginPage } from './views/auth/LogInPage'
import SignUpPage from './views/auth/SignUpPage'
import Dashboard from './views/dashboard/Dashboard'
import { PrivateRoute } from './auth/PrivateRoute'
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail'
import { DashRoutes } from './views/dashboard/DashRoutes';
import Header from './views/dashboard/Header'
export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact>
                    <LoginPage></LoginPage>
                </Route>
                <Route path="/signup" exact>
                    <SignUpPage></SignUpPage>
                </Route>
                <Route path="/dashboard">
                    <Header />
                    <DashRoutes></DashRoutes>
                </Route>
            </Switch>
        </Router>
    )
}

// auth={false}
