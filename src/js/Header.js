import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import NavItem from 'react-bootstrap/NavItem';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class Header extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <hr />
                <Navbar className="navbar-expand-md navbar-light bg-light sticky-top">
                    <Container className="container-fluid">
                        <NavbarBrand inline="true">PIZZA</NavbarBrand>
                        <NavbarToggle data-toggle="collapse" data-target="#navbarResponsive">
                            <span>Click Me</span> 
                        </NavbarToggle>
                        <NavbarCollapse id="navbarResponsive">
                            <Nav>
                                <NavItem className="active">
                                    <Link className="text-muted nav-link" to="/order">Order Form</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="text-muted nav-link" to="/history">History</Link>
                                </NavItem>
                            </Nav>
                        </NavbarCollapse>
                    </Container>
                </Navbar>
                <hr />
            </React.Fragment>
        )
    }
}

export default Header
