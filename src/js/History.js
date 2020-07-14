import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modals from './Modals';

export class History extends Component {
    constructor(props) {
        super();
        this.state = {
            history : [],
            show : false,
            modalData : {}
        }
    }
    handleClose() {
        console.log("********* show",this.state.show);
        this.setState({show : !this.state.show});
    }

    componentWillMount() {
        axios.get("/api/getOrders")
        .then((response) => {
            this.setState({history : (response.data) ? response.data : []})
        })
    }

    viewOrder(data) {
        console.log("************* DATA", data);
        this.setState({...this.state, modalData : data});
        this.handleClose()
    }

    render() {
        console.log("**** HISTORY", this.state.history);
        const history = this.state.history;
        return (
            <div>
               <h1>Order History</h1>
               <Modals show={this.state.show} handleClose={this.handleClose.bind(this)} data={this.state.modalData}/>
               <Table striped bordered hover responsive size="sm">
                   <thead className="text-center">
                       <tr>
                           <th width="33%">Order ID</th>
                           <th width="33%">Orders</th>
                           <th width="33%">Actions</th>
                       </tr>
                   </thead>
                   <tbody className="text-center">
                       {
                        history.map((data, i) => {
                            return (
                                <tr key={data._id}>
                                    <td>
                                        {data._id}
                                    </td>
                                    <td colSpan="1">
                                        {data.final_order.order.pizza.length} Pizza/s
                                    </td>
                                    <td>
                                        <Button variant="outline-primary" onClick={e => this.viewOrder(data)}>View Order</Button>
                                    </td>
                                </tr>
                            )
                        })
                       }                        
                   </tbody>
               </Table>
            </div>
        )
    }
}

export default History
