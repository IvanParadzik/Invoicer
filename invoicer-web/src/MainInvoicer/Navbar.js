

import React from 'react';


import {Navbar , Nav , NavDropdown} from 'react-bootstrap'

import './navbar.css'
import {
    Link,
  } from "react-router-dom";

import logo from '../logo192.png'



export class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCollapse: false };
    this.closeOnClick = this.closeOnClick.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  closeOnClick() {
    if (this.state.isCollapse) {
      this.setState({ isCollapse: false });
    }
  }

  handleClick(event) {
    event.preventDefault();
    if (!this.state.isCollapse) {
      document.addEventListener("mousedown", this.handleClickOutside);
      this.setState({ isCollapse: !this.state.isCollapse });
    } else {
      this.setState({ isCollapse: false });
    }
  }
  handleClickOutside(event) {
    if (this.state.isCollapse) {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        document.getElementById("toggle").click();
        document.removeEventListener("mousedown", this.handleClickOutside);
        this.setState({ isCollapse: false });
      }
    }
  }

  render() {
    const logged_out_nav = (
      <Navbar
        expand="lg"
        className={this.props.className}
        ref={this.wrapperRef}
      >
        <Navbar.Brand>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt = 'logo'
          />
        </Navbar.Brand>
        <Navbar.Brand id="brand-style">Invoicer</Navbar.Brand>
        <Navbar.Toggle
          onClick={(event) => this.handleClick(event)}
          id="toggle"
          aria-controls="responsive-navbar-nav"
          className="toggle"
        />
        <Navbar.Collapse in={this.state.isCollapse} id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/" className="link" onClick={this.closeOnClick}>
              <button className="button-nav">Home</button>
            </Link>
            <Link to="/login" className="link" onClick={this.closeOnClick}>
              <button className="button-nav ">Log in</button>
            </Link>
            <Link to="/signup" className="link" onClick={this.closeOnClick}>
              <button className="button-nav">Sing up</button>
            </Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    // Navbar when user is logged in

    const logged_in_nav = (
      <Navbar
        expand="lg"
        className={this.props.className}
        ref={this.wrapperRef}
      >
        <Navbar.Brand>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt ='logo'
          />
        </Navbar.Brand>
        <Navbar.Brand id="brand-style">Invoicer</Navbar.Brand>
        <Navbar.Toggle
          onClick={(event) => this.handleClick(event)}
          aria-controls="responsive-navbar-nav"
          id="toggle"
          className="toggle"
          alt= 'logo'
        />
        <Navbar.Collapse in={this.state.isCollapse} id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/" onClick={this.closeOnClick}>
              <button className="button-nav">Clients</button>
            </Link>
            <Link to="/invoices/" onClick={this.closeOnClick}>
              <button className="button-nav">Invoices</button>
            </Link>
            <NavDropdown title="Settings" className="dropdown-navbar" id = "dropdown-navbar">
              <NavDropdown.Item  as ={Link} to = '/user-settings/' onClick={this.closeOnClick} className = 'item-dropdown-navbar'>User Account</NavDropdown.Item>
              <NavDropdown.Item as ={Link} to = '/invoice-settings/'onClick={this.closeOnClick} className = 'item-dropdown-navbar'>Invoice Settings</NavDropdown.Item>
          </NavDropdown>
            <Link to="/" onClick={this.closeOnClick}>
              <button
                className="button-nav"
                onClick={(e) => {
                  this.props.handle_logout();
                }}
              >
                Logout
              </button>
            </Link>
           
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    return <div>{this.props.logged_in ? logged_in_nav : logged_out_nav}</div>;
  }
}