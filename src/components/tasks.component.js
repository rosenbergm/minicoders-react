import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import Queries from '../managers/queries'
import { Query } from 'react-apollo';
import Loader from './loader.component'
import store from '../redux/store'
import { connect } from 'react-redux';
import { FaCheck, FaCode, FaSignOutAlt } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
import User from './auth/user.component'

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

  taskSelected (task) {
    return this.props.task && task.taskId === this.props.task.taskId
  }

  render () {

    return (
      <div className="App-tasks">
        <h2 href="/">mini<FaCode />CODERS</h2>
        <div className="divider"></div>
        <User />
        <div className="divider"></div>
        {/*<span onClick={() => this.levelDown()}>Dolu</span>
        {this.state.level}
        <span onClick={() => this.levelUp()}>Nahoru</span>*/}
        <div className="tasks">
          {this.props.tasks.map(userTask => (
            <div className={`task-item ${this.taskSelected(userTask) && 'selected'}`} key={userTask} onClick={() => {
              store.dispatch({ type: 'SET_ACTIVE_TASK', task: userTask })
            }}>{userTask.title} {userTask.finished && <FaCheck color="green" />}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks, task: state.task, user: state.user };
}

export default connect(mapStateToProps)(Tasks);
