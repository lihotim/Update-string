import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';


class MyNavbar extends Component {
    render() {
        return(
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">My 1st Dapp</Navbar.Brand>
                <span className="navbar-text">
                    Your account: {this.props.account}
                </span>
             </Navbar>
        );
    }
}

export default MyNavbar;
