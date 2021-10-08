import React, { Component } from 'react'
import './rest-profile.scss'
import About from './about'
import Orders from './orders'
import ViewOrder from './view-orders'
class RestProfile extends Component {
    constructor() {
        super()
        this.state = { index: 0 }

        this.setShowState = this.setShowState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    setShowState(val) {
        console.log('clcik' + val)
        this.setState({ index: val })
        // this.setState({ index: 1 })
        // console.log(event.target.value)
    }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value)
        console.log(this.state.value)
        event.preventDefault()
    }

    render() {
        return (
            <div className="RestProfile">
                <div className="leftContent">
                    <ul>
                        <li onClick={() => this.setShowState(0)}>About</li>
                        <li onClick={() => this.setShowState(1)}>View/Edit/Add Dishes</li>
                        <li onClick={() => this.setShowState(2)}>Orders</li>
                    </ul>
                </div>
                <div className="rightContent">
                    {this.state.index === 0 && <About></About>}
                    {this.state.index === 1 && <ViewOrder />}
                    {this.state.index === 2 && <Orders />}
                </div>
            </div>
        )
    }
}

export default RestProfile
