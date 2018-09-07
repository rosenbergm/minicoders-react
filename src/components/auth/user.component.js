import React, { Component } from 'react';
import store from '../../redux/store'
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import Mutations from '../../managers/mutations'
import { FaSignOutAlt } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Loader from '../loader.component';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      user: {},
      password_repeat: '',
      warning: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({ user: { ...this.state.user, name: this.props.user.name } })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  submit(changeProfile) {
    console.log(this.state.user, this.state.password_repeat)
    if (this.state.user.password == this.state.password_repeat) {
      //e.preventDefault()
      changeProfile()
      this.toggle()
    } else {
      this.setState({warning: true})
    }
  }

  render () {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>
          <span style={{ cursor: 'pointer' }} onClick={this.toggle}>{this.props.user.name}</span>
          <FaSignOutAlt onClick={() => store.dispatch({ type: 'LOGOUT' })} style={{ marginLeft: '20px', cursor: 'pointer' }} />
        </h3>
        <Mutation
          mutation={Mutations.UPDATE_USER}
          variables={{data: { name: this.state.user.name, password: this.state.user.password }}}
        >

        {(changeProfile, { loading, error, data } ) => {
          if (loading) return <Loader />;

          return(
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Profil</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Jméno</Label>
                    <Input id="name" value={this.props.user.name} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ user: { ...this.state.user, name: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Heslo</Label>
                    <Input id="password" type="password" placeholder="Heslo" onChange={event => this.setState({ user: { ...this.state.user, password: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password_repeat">Heslo znovu</Label>
                    <Input id="password_repeat" type="password" placeholder="Heslo znovu" onChange={event => this.setState({ password_repeat: event.target.value })} />
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" onClick={() => this.submit(changeProfile)}>Ulozit</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Zrusit</Button>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                {this.state.warning && <Alert color='warning'>Zadaná hesla se neshodují!</Alert>}
              </ModalFooter>
            </Modal>
          )
        }}
        </Mutation>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(User);
