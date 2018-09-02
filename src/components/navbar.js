import React, { Component } from 'react';
import store from '../redux/store'
import Queries from '../managers/queries'
import { Query } from 'react-apollo';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap'
import { connect } from 'react-redux';

export default class MiniNavbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Query query={Queries.GET_USER}>
          {({ data, error, loading }) => {
            if (error || loading) return <span>Nothing to show...</span>

            return (
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">miniCODERS</NavbarBrand>
                <Collapse navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <a style={{padding: '20px'}} onClick={() => store.dispatch({ type: 'LOGOUT' })} href="/login">{data.user.name} - Odhlasit se</a>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            )
          }}
        </Query>
      </div>
    )
  }
}
