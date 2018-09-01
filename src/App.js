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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      action: undefined,
    }
  }

  login(token) {
    localStorage.setItem('token', token)
    this.setState({ action: 'login' })
  }

  logout() {
    console.log('loging out')
    localStorage.setItem('token', '')
    this.setState({ action: 'logout' })
  }

  setUser(user) {
    this.setState({
      user,
    })
  }

  render() {
    const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('token').length > 0;

    return (
      <Router>
        <div>
          <Route exact path='/register' component={RegisterFormComponent} />
          {isLoggedIn && <SecuredComponent logout={() => this.logout()} />}
          {!isLoggedIn && <LoginFormComponent appLogin={(token) => this.login(token)} />}
        </div>
      </Router>
    );
  }
}

export default App;
