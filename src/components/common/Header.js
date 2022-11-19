import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

class Header extends Component {
  render() {
    return (
      <>
        <Navbar bg="light" variant="light" sticky="top">
          <Navbar.Brand>
            <NavLink exact to="/" activeClassName="active">
              <img src={logo} />
            </NavLink>
          </Navbar.Brand>
          {/* <Nav className='mr-auto'>
            <Nav.Link className='active'>Overview</Nav.Link>
            <Nav.Link>Campaigns</Nav.Link>
            <Nav.Link>Analytics</Nav.Link>
          </Nav> */}

          {/* <Button variant="outline-primary active">Premium</Button> */}
        </Navbar>
      </>
    );
  }
}

export default Header;
