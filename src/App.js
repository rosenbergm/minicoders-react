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
import TaskFormComponent from './components/taskForm.component';
import AdminComponent from './components/admin.component';

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

      if (data && data.user && !errors) {
        window.history.pushState({}, 'Login', '/')
        store.dispatch({ type: 'SET_USER', user: data.user })
      } else {
        window.history.pushState({}, 'Login', '/login')
        store.dispatch({ type: 'SET_USER', user: undefined })
      }
    } catch (e) {
      console.log('failed', e)
      window.history.pushState({}, 'Login', '/login')
      store.dispatch({ type: 'SET_USER', user: undefined })
    } finally {
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
        <div style={{ height: '100%' }}>
          {isLoggedIn && <Route exact path='/admin' component={AdminComponent} />}
          <Route exact path="/task/edit/:taskId" component={TaskFormComponent} />

          <Route exact path='/register' component={RegisterFormComponent} />
          <Route exact path='/login' component={LoginFormComponent} />
          {isLoggedIn && <SecuredComponent client={this.props.client} console={this.props.console} />}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user, task: state.task };
}

export default connect(mapStateToProps)(App)
