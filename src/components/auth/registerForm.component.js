import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Mutation } from 'react-apollo';
import Mutations from '../../managers/mutations'
import Loader from '../loader.component'
import store from '../../redux/store'

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
      <div style={{width: '400px', height: '300px', margin: 'auto', marginTop: window.innerHeight / 2 - 300 + 'px', marginBottom: window.innerHeight}}>
        <Mutation
          onCompleted={(data) => {
            store.dispatch({ type: 'LOGIN', user: data.register.user, token: data.register.token })
            this.props.history.push('/')
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
                  <h2 style={{textAlign: 'center', width: '400px'}}>Registrovat se</h2>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input id="name" type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ name: event.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="E-Mail" onChange={event => this.setState({ email: event.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" placeholder="Heslo" onChange={event => this.setState({ password: event.target.value })} />
                  </FormGroup>
                  <Button style={{width: '400px'}}>Submit</Button>
                </Form>
                {loading && <p>Loading...</p>}
                {error && <p>{error.toString()}</p>}
                <Link to='/login'><h6 style={{textAlign: 'center', marginTop: '5px'}}>Přihlásit se</h6></Link>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}
