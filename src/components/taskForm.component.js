import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Mutation } from 'react-apollo';
import Mutations from '../managers/mutations'
import Loader from './loader.component'
import store from '../redux/store'

export default class TaskFormComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      task: {},
      title: '',
      problem: '',
      solution: '',
      test: '',
      category: '',
      canvas: ''
    }
  }

  componentDidMount() {
    console.log(this.props.task)
  }

  render() {
    return (
      <div style={{width: '400px', height: '235px', margin: 'auto', marginTop: window.innerHeight / 2 - 235 + 'px'}}>
        <Mutation
          mutation={Mutations.CREATE_TASK}
          variables={{data: { title: this.state.title, problem: this.state.problem, solution: this.state.solution
            , test: this.state.test, category: this.state.category, canvas: this.state.canvas }}}
        >
          {(createTask, { loading, error, data } ) => {
            if (loading) return <Loader />;

            return (
              <div className="login-form">
                {/*<Form>
                  <FormGroup>
                    <Label for="name">Jméno úkolu</Label>
                    <Input id="name" value={} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ user: { ...this.state.user, title: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Zadání</Label>
                    <Input id="name" value={} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ user: { ...this.state.user, problem: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Řešení</Label>
                    <Input id="name" value={} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ user: { ...this.state.user, solution: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Test</Label>
                    <Input id="name" value={} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ user: { ...this.state.user, test: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Kategorie</Label>
                    <Input id="name" value={} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ user: { ...this.state.user, category: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Je Canvas?</Label>
                    <Input id="name" value={} type="name" placeholder="Jmeno a prijmeni" onChange={event => this.setState({ user: { ...this.state.user, canvas: event.target.value } })} />
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" onClick={() => this.submit(createTask)}>Vytvorit/Ulozit</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Zrusit</Button>
                  </FormGroup>
                </Form>*/}
                {loading && <p>Loading...</p>}
                {error && <p>{error.toString()}</p>}
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}


