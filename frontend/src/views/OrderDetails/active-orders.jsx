import React, { useState, useEffect, Component } from 'react'
import './OrderDetails.scss'
class ActiveOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: this.props.data,
        }
        this.viewReceipt = this.viewReceipt.bind(this)
    }

    viewReceipt = (item) => {
        console.log(item)
    }
    render() {
        return (
            <div>
                {this.state.orders.length > 0 &&
                    this.state.orders.map((el, index) => (
                        <div className="order-box" key={index}>
                            <span>{el.restId}</span>
                            <span>{el.orderStatusTitle}</span>
                            <div>
                                {el.quantity} items for ${el.price} on {el.date}
                                <input
                                    type="submit"
                                    value="View Receipt"
                                    onClick={() => this.viewReceipt(el)}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        )
    }
}

export default ActiveOrders
