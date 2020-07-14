import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Form from './Form';
import History from './History';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

export default function Main() {
    return (
        <Container>
            <Router>
                <Header />
                <Switch>
                    <Redirect exact from="/" to="/order" />
                    <Route path="/order" component={Form} />
                    <Route path="/history" component={History}/>
                    <Route path="*"> 404 Page Not Found </Route>
                </Switch>
            </Router>
        </Container>
    )
}
