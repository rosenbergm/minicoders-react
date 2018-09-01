import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Mutation } from 'react-apollo';
import Mutations from '../managers/mutations'
import Loader from './loader.component'
import RegisterFormComponent from './registerForm.component';

export default class LoginFormComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <Mutation
         onCompleted={(data) => {
          this.props.appLogin(data.login)
         }}
         mutation={Mutations.LOGIN}
         variables={{data: { email: this.state.username, password: this.state.password }}}
       >
        {(login, { loading, error, data } ) => {
          if (loading) return <Loader />;

          return (
            <div className="login-form">
              <Form onSubmit={e => {
                e.preventDefault()
                login()
              }}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" onChange={event => this.setState({ username: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input id="password" type="password" onChange={event => this.setState({ password: event.target.value })} />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
              {loading && <p>Loading...</p>}
              {error && <p>{error.toString()}</p>}
              <RegisterFormComponent/>
            </div>
          )
        }}
      </Mutation>
    )
  }
}
