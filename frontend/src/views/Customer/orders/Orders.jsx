import React, { useState, useEffect, Component } from 'react'
import './Orders.scss'
import { Col, Container, Row, Badge } from 'react-bootstrap'
import * as moment from 'moment'
import ReceiptModal from './ReceiptModal'

class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: this.props.data,
            showHide: false,
            receipt: [],
        }
        this.viewReceipt = this.viewReceipt.bind(this)
    }

    viewReceipt = (val, receipt) => {
        console.log(val)
        this.setState({
            showHide: val,
            receipt: receipt,
        })
        console.log(this.state.showHide)
    }
    render() {
        return (
            <Container fluid>
                {this.state.orders.length > 0 &&
                    this.state.orders.map((el, index) => (
                        <div className="order-box" key={index}>
                            <Row>
                                <Col md={6}>
                                    <span>{el.restName}</span>
                                    <div>
                                        {el.quantity} items for ${el.price} on{' '}
                                        {new Date(el.date).toGMTString()}
                                        <input
                                            type="submit"
                                            value="View Receipt"
                                            onClick={() => this.viewReceipt(true, el)}
                                        />
                                    </div>
                                </Col>
                                <Col md={{ span: 1, offset: 4 }}>
                                    <Badge pill bg="info" text="dark">
                                        {el.orderStatusTitle}
                                    </Badge>
                                </Col>
                            </Row>
                        </div>
                    ))}
                {this.state.showHide && (
                    <ReceiptModal
                        showHide={this.state.showHide}
                        modal={this.viewReceipt.bind(this)}
                        data={this.state.receipt}
                    ></ReceiptModal>
                )}
            </Container>
        )
    }
}

export default Orders
