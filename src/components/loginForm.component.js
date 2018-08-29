import React, { Component } from 'react';
//import api from '../helpers/api'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class LoginFormComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      open: false,
      user: {},
    }
  }

  show = () => this.setState({ open: true })
  handleCancel = () => this.setState({ open: false })

  async logIn(response) {
    const token = response ? response.text : ''

    console.log(response)

    localStorage.setItem('token', token)
    this.props.login()
  }

  render() {
    let response
    return (
      <div className="login-form">
        {MUTATION}
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
          <Button onClick={() => this.logIn(response)}>Submit</Button>
        </Form>
      </div>
    )
  }
}
