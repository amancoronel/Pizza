import React from 'react'
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Card from 'react-bootstrap/Card';

export default function Form() {
    let fileReader;
    let [message, updateMessage] = React.useState("");
    let [translated, updateOrder] = React.useState({});
    let [xmlData, updateXml] = React.useState("");
    

    let fileUploadHandler = (file) => {
        if(file.name.split('.').pop() != "pml" && file.name.split('.').pop() != "txt" ) return false;
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }

    let handleFileRead = () => {
        let data = fileReader.result;
        updateXml(data);
    }

    let submitOrder = (e) => {
        e.preventDefault();
        let newData = "";
        let data;
        if(xmlData == "" && message == "") return false;
        if(xmlData == "" || xmlData.length == 0) {
            data = message;
        } else {
            data = xmlData;
        }
            data.split("").map((value) => {
                value = changeValue(value);
                newData += value;
            })
            
            axios({
                method : "POST",
                url : "/api/addOrders",
                data : {
                    content: newData
                }
            })
            .then(response => showOrder(response.data.final_order))
            .catch(error => showOrder(false))        
    }

    let changeValue = (value) => {
        switch(value) {
            case "{" : return "<";
            case "}" : return ">";
            case "'\'" : return "/";
            default : return value;
        }
    }

    let showOrder = (data) => {
        if(!data) updateOrder({});
        else {
            updateOrder(data);
        }
    }
    let mainOrderForm = (translated && translated.order) ? <div style={{display: "flex", flexDirection: "column"}}>
            <span> Order Number : {translated.order.number}</span>
            <hr />
            {
                translated.order.pizza?.map((pizza, i) => {
                    return <div  key={pizza.number} className="pizza-header" style={{order : translated.order.pizza.length - i}}>
                        <span>
                            <b> Pizza {pizza.number} </b> - {pizza.size} , {pizza.crust} , {pizza.type}
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
        </div> : <div className="text-muted">No Data...</div>;

    return (
        <Row>
            <Col sm="12">
                <Jumbotron className="bg-dark box-shadow">
                    <Row>
                        <Col md="6">
                             <Button className="btn-primary submit" inline="true" onClick={e => submitOrder(e)}>Submit</Button>

                            <Tabs>
                                <Tab eventKey="InputForm" title="Input PML Order">
                                    <textarea onChange={e => updateMessage(e.target.value)}value={message}></textarea>                                                                
                                </Tab>
                                <Tab eventKey="UploadFile" title="Upload File">
                                    <Card>
                                        <input className="form-control uploadFile" type="file" onChange={e => fileUploadHandler(e.target.files[0])}/>
                                    </Card>
                                </Tab>
                            </Tabs>
                        </Col>
                        <Col md="6">
                            <Tabs>
                                <Tab eventKey="ResultArea" title="Result :">
                                    <div className="resultArea">
                                        {mainOrderForm}
                                    </div>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Jumbotron>
            </Col>
        </Row>
    )
}
