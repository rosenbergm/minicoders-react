import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Mutation } from 'react-apollo';
import Mutations from '../../managers/mutations'
import Loader from '../loader.component'
import store from '../../redux/store'

export default class LoginFormComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <div style={{width: '400px', height: '235px', margin: 'auto', marginTop: window.innerHeight / 2 - 235 + 'px'}}>
        <Mutation
          onCompleted={(data) => {
            store.dispatch({ type: 'LOGIN', user: data.login.user, token: data.login.token })
            this.props.history.push('/')
          }}
          mutation={Mutations.LOGIN}
          variables={{data: { email: this.state.email, password: this.state.password }}}
        >
          {(login, { loading, error, data } ) => {
            if (loading) return <Loader />;

            return (
              <div className="login-form">
                <Form onSubmit={e => {
                  e.preventDefault()
                  login()
                }}>
                  <h2 style={{textAlign: 'center', width: '400px'}}>Prihlasit se</h2>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" onChange={event => this.setState({ email: event.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={event => this.setState({ password: event.target.value })} />
                  </FormGroup>
                  <Button style={{width: '400px'}}>Submit</Button>
                </Form>
                {loading && <p>Loading...</p>}
                {error && <p>{error.toString()}</p>}
                <Link to='/register'><h6 style={{textAlign: 'center', marginTop: '5px'}}>Nemáš ještě účet? Registruj se…</h6></Link>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}
