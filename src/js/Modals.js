import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

export class Modals extends React.Component {
    constructor() {
        super();
    }
    render() {
        let data = this.props.data;
        let order = (data && data.final_order) ? this.props.data.final_order.order : false ;
        let modalBody = (order) ? <div style={{display: "flex", flexDirection: "column"}}>
            {
                order.pizza?.map((pizza, i) => {
                    return <div  key={pizza.number} className="pizza-header" style={{order : order.pizza.length - i}}>
                        <span>
                            <b>Pizza {pizza.number} </b> - {pizza.size} , {pizza.crust} , {pizza.type}
                        </span> 
                        {
                                pizza.toppings?.map((topping => {
                                    return <div key={topping.area} className="topping-header">
                                        <span>Toppings {topping.area} :</span>
                                        {
                                            topping.item?.map((item) => {
                                                return <div key={item} className="topping-item">
                                                    <span> {item} </span>
                                                </div>
                                            })
                                        }
                                    </div>
                                }))
                        }
                        <hr />
                    </div>
                })
            }
            </div> : <div></div>;

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Order ID {data._id}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
   
}

export default Modals;