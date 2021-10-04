import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header';
import Dashboard from './Dashboard'
import RestCardDetail from '../common/RestCardDetail/RestCardDetail';

export const DashRoutes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/dashboard" exact>
                        <Dashboard></Dashboard>
                    </Route>
                    <Route path="/dashboard/restaurant-details" exact>
                        <RestCardDetail />
                    </Route>

                </Switch>
            </Router>
        </div>
    )
}

// auth={false}
