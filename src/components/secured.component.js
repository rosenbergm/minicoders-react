import React, { Component } from 'react';
import '../App.css';
import Tasks from './tasks.component'
import Editor from './editor.component'
import { Navbar, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap'

class SecuredComponent extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">MINICODERS</NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <a style={{padding: '20px'}} onClick={() => this.props.logout()} href="#">Odhlasit se</a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="App">
          <div style={{ display: 'flex' }}>
            <Tasks />
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}

export default SecuredComponent;
