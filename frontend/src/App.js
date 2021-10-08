import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignUpPage from './views/auth/SignUpPage'
import './App.scss'
import Dashboard from './views/dashboard/Dashboard';
import Persona from './views/common/Persona/Persona';
import { LoginPage } from './views/auth/LogInPage';
import Header from './views/dashboard/Header';
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail';
import OrderDetails from './views/OrderDetails/OrderDetails';
import CustomerProfile from './views/CustomerProfile/CustomerProfile';
import Cart from './views/Cart/Cart';
import PrivateRoute from './auth/PrivateRoute';
import RestProfile from './views/Restaurant/rest-profile'
import About from './views/Restaurant/about';
function App() {
    return (
        <div className="parent-container">
            <Router>
                <Route path="/" exact>
                    <Persona />
                </Route>
                <Route path="/user-login" exact>
                    <LoginPage data={'customer'} />
                </Route>
                <Route path="/restaurant-login" exact>
                    <LoginPage data={'restaurant'} />
                </Route>
                <Route path="/user-signup" exact>
                    <SignUpPage data={'customer'} />
                </Route>
                <Route path="/restaurant-signup" exact>
                    <SignUpPage data={'restaurant'} />
                </Route>
                <PrivateRoute path="/dashboard">
                    <div className="header">
                        <Header />
                    </div>
                    <div className="mainContent">
                        <Route path="/dashboard" exact>
                            <Dashboard></Dashboard>
                        </Route>
                        <Route path="/dashboard/restaurant-details" exact>
                            <RestCardDetail />
                        </Route>
                        <Route path='/dashboard/cart-details' exact>
                            <Cart></Cart>
                        </Route>
                        <Route path='/dashboard/order-details' exact>
                            <OrderDetails></OrderDetails>
                        </Route>
                    </div>
                </PrivateRoute>
                <PrivateRoute path='/customer-profile' exact>
                    <CustomerProfile />
                </PrivateRoute>
                <PrivateRoute path='/rest-dashboard' exact>
                    <RestProfile />
                </PrivateRoute>
            </Router>

        </div>
    )
}

export default App
