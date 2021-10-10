import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignUpPage from './views/auth/SignUpPage'
import './App.scss'
import Dashboard from './views/Customer/dashboard/Dashboard'
import Persona from './views/common/Persona/Persona'
import { LoginPage } from './views/auth/LogInPage'
import Header from './views/Customer/dashboard/Header'
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail'
import OrderDetails from './views/Customer/orders/OrderDashboard'
import CustomerProfile from './views/Customer/profile/CustomerProfile'
import Cart from './views/Customer/cart/Cart'
import PrivateRoute from './auth/PrivateRoute'
import RestProfile from './views/restaurant/Profile'
import About from './views/restaurant/About'
import ViewOrder from './views/restaurant/ViewOrders'
import CompleteOrders from './views/restaurant/CompletedOrders'
import ActiveOrders from './views/restaurant/ActiveOrders'

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
                        <Route path="/dashboard/cart-details" exact>
                            <Cart></Cart>
                        </Route>
                        <Route path="/dashboard/order-details" exact>
                            <OrderDetails></OrderDetails>
                        </Route>
                    </div>
                </PrivateRoute>
                <PrivateRoute path="/customer-profile" exact>
                    <CustomerProfile />
                </PrivateRoute>
                <PrivateRoute path="/rest-dashboard">
                    <div className="profile">
                        <RestProfile />
                        <Route path="/rest-dashboard/about" exact>
                            <div className="about">
                                <About />
                            </div>
                        </Route>
                        <Route path="/rest-dashboard/dishes" exact>
                            <div className="dish">
                                <ViewOrder />{' '}
                            </div>
                        </Route>
                        <Route path="/rest-dashboard/active" exact>
                            <ActiveOrders />
                        </Route>
                        <Route path="/rest-dashboard/completed" exact>
                            <CompleteOrders />
                        </Route>
                    </div>
                </PrivateRoute>
            </Router>
        </div>
    )
}

export default App
