import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Mutation } from 'react-apollo';
import Mutations from '../managers/mutations'
import Loader from './loader.component'

export default class RegisterFormComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <Mutation
         onCompleted={(data) => {
          //this.props.appLogin(data.login)
         }}
         mutation={Mutations.REGISTER}
         variables={{data: { name: this.state.name, email: this.state.email , password: this.state.password }}}
       >
        {(register, { loading, error, data } ) => {
          if (loading) return <Loader />;

          return (
            <div className="login-form">
              <Form onSubmit={e => {
                e.preventDefault()
                register()
              }}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input id="name" type="name" onChange={event => this.setState({ name: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" onChange={event => this.setState({ email: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input id="password" type="password" onChange={event => this.setState({ password: event.target.value })} />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
              {loading && <p>Loading...</p>}
              {error && <p>{error.toString()}</p>}
            </div>
          )
        }}
      </Mutation>
    )
  }
}
