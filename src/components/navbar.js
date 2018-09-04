import React, { Component } from 'react';
import store from '../redux/store'
import Queries from '../managers/queries'
import { Query } from 'react-apollo';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap'
import { connect } from 'react-redux';

class MiniNavbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="App-header">
        <Navbar expand="md">
          <span>{this.props.task && this.props.task.problem}</span>
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { task: state.task };
}

export default connect(mapStateToProps)(MiniNavbar);
