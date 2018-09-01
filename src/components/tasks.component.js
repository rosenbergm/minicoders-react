import React, { Component } from 'react';
import Queries from '../managers/queries'
import { Query } from 'react-apollo';
import Loader from './loader.component'
import store from '../redux/store'

export default class Tasks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: undefined
    }
  }

  render () {
    return (
      <div style={{marginRight: '20px'}}>
        <Query query={Queries.GET_USER_TASKS}>
          {({ data, error, loading }) => {
            if (error) return '💩 Oops!';
            if (loading) return <Loader />;

            return (
              data.userTasks.map(userTask => (
                <div key={userTask}>
                  <h2 onClick={() => {
                    store.dispatch({ type: 'SET_TASK', task: userTask })
                  }}>{userTask.task.title}</h2>
                </div>
              ))
            )
          }}
        </Query>
      </div>
    )
  }
}
