import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Queries from './managers/queries'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import LoginFormComponent from './components/loginForm.component';
import SecuredComponent from './components/secured.component';
import RegisterFormComponent from './components/registerForm.component';
import Loader from './components/loader.component'
import { connect } from 'react-redux';
import store from './redux/store'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    try {
      const { data: user } = await this.props.client.query({query: Queries.GET_USER})
      store.dispatch({ type: 'SET_USER', user: user })
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
