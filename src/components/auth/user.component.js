import React, { Component } from 'react';
import store from '../../redux/store'
import { connect } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>
          <span style={{ cursor: 'pointer' }} onClick={this.toggle}>{this.props.user.name}</span>
          <FaSignOutAlt onClick={() => store.dispatch({ type: 'LOGOUT' })} style={{ marginLeft: '20px', cursor: 'pointer' }} />
        </h3>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Profil</ModalHeader>
          <ModalBody>
            <Form onSubmit={e => {
              e.preventDefault()
            }}>
              <FormGroup>
                <Label for="name">Jméno</Label>
                <Input id="name" value={this.props.user.name} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ name: event.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Heslo</Label>
                <Input id="password" type="password" placeholder="Heslo" onChange={event => this.setState({ password: event.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="password_repeat">Heslo znovu</Label>
                <Input id="password_repeat" type="password" placeholder="Heslo znovu" onChange={event => this.setState({ password_repeat: event.target.value })} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Ulozit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Zrusit</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(User);
