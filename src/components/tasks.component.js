import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import Queries from '../managers/queries'
import { Query } from 'react-apollo';
import Loader from './loader.component'
import store from '../redux/store'
import { connect } from 'react-redux';

class Tasks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: undefined,
      level: 1
    }
  }

  levelUp () {
    this.setState({ level: this.state.level + 1 })
  }

  levelDown () {
    this.setState({ level: this.state.level - 1 })
  }

  async componentDidMount () {
    await this.loadTasks()
  }

  async componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevState.level !== this.state.level) {
      await this.loadTasks()
    }
  }

  async loadTasks () {
    const { data, errors } = await this.props.client.query({query: Queries.GET_USER_TASKS, variables: { data: { level: this.state.level }} })

    if (data) {
      store.dispatch({ type: 'SET_TASKS', tasks: data.userTasks })
    }
  }

  render () {

    return (
      <div>
        <span onClick={() => this.levelDown()}>Dolu</span>
        {this.state.level}
        <span onClick={() => this.levelUp()}>Nahoru</span>
        <ListGroup>
          {this.props.tasks.map(userTask => (
            <ListGroupItem className={userTask.finished ? 'text-success' : ''} key={userTask} onClick={() => {
              store.dispatch({ type: 'SET_ACTIVE_TASK', task: userTask })
            }}>{userTask.title}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

export default connect(mapStateToProps)(Tasks);
