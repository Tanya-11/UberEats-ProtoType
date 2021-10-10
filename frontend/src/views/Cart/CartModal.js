// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from "react-router";
// import './CartModal.scss';
// const CartModal = () => {
//     const this.orders = useSelector(state => state.cart);
//     const history = useHistory();
//     useEffect(() => {
//         console.log('this.orders' + this.orders.length);
//     })


//     return (
//         <div>
//             {
//                 this.orders.length > 0 && (
//                     <div className="cart-wrapper">
//                         <table>

//                             <thead>
//                                 <tr>
//                                     <th>Quantity</th>
//                                     <th>Name</th>
//                                     <th>Price</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {this.orders.map((order, index) => (
//                                     <tr key={index}>

//                                         <td>{order.text}</td>
//                                         <td>{order.dishName}</td>
//                                         <td>{order.text * (+order.price)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )
//             }
//             {
//                 this.orders.length === 0 &&
//                 <div className="cart-wrapper">
//                     {/* <span className="close">X</span> */}
//                     <span className="text">No Items in Cart
//                     </span>
//                 </div>
//             }
//         </div>
//     )
// }


// export default CartModal;
import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class CartModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide: this.props.data,
            orders: this.props.cart
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
        this.props.modal()

    }
    handleCheckout() {
        this.handleModalShowHide();
        this.props.history.push('/dashboard/cart-details')
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showHide}>
                    <Modal.Header onClick={() => this.handleModalShowHide()}>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.orders && this.state.orders.length > 0 && (
                                <div className="cart-wrapper">
                                    <Table>

                                        <thead>
                                            <tr>
                                                <th>Quantity</th>
                                                <th>Dish</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.orders.map((order, index) => (
                                                <tr key={index}>

                                                    <td>{order.text}</td>
                                                    <td>{order.dishName}</td>
                                                    <td>{order.text * (+order.price)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )
                        }
                        {
                            this.state.orders && this.state.orders.length === 0 &&
                            <div className="cart-wrapper">
                                <span className="text">No Items in Cart
                                </span>
                            </div>
                        }
                    </Modal.Body>
                    < Modal.Footer >
                        {this.state.orders.length > 0 &&
                            <Button variant="primary" onClick={() => this.handleCheckout()}>
                                Proceed to Checkout
                            </Button>
                        }
                    </Modal.Footer >
                </Modal >
            </div >
        )
    }
}
const mapStateToProps = (state) => ({ cart: state.cart })
export default withRouter(connect(mapStateToProps)(CartModal))
