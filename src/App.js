import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Queries from './managers/queries'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import LoginFormComponent from './components/auth/loginForm.component';
import SecuredComponent from './components/secured.component';
import RegisterFormComponent from './components/auth/registerForm.component';
import Loader from './components/loader.component'
import { connect } from 'react-redux';
import store from './redux/store'

var original = window.console;
window.console = {
  log: (args) => {
    store.dispatch({
      type: 'ADD_TO_CONSOLE',
      log: args
    })
    original.log.apply(original, [args]);
  },
  success: (args) => {
    store.dispatch({
      type: 'ADD_TO_CONSOLE',
      log: `<span style="color: green;">${args}</span>`
    })
  }
  , warn: (args) => {
    original.warn.apply(original, [args]);
  }
  , error: (args) => {
    original.error.apply(original, [args]);
    store.dispatch({
      type: 'ADD_TO_CONSOLE',
      log: `<span style="color: red;">${args}</span>`
    })
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    try {
      const { data, errors } = await this.props.client.query({query: Queries.GET_USER})

      if (data.user) {
        store.dispatch({ type: 'SET_USER', user: data.user })
      } else {
        store.dispatch({ type: 'SET_USER', user: undefined })
      }
    } catch (e) {} finally {
      this.setState({ loaded: true })
    }
  }

  render() {
    const isLoggedIn = this.props.user;

    if (!this.state.loaded) {
      return <Loader />
    }

    return (
      <Router>
        <div>
          <Route exact path='/register' component={RegisterFormComponent} />
          <Route exact path='/login' component={LoginFormComponent} />
          {isLoggedIn && <SecuredComponent />}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(App)
