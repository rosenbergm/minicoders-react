import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Queries from '../managers/queries'

class SecuredComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      res: [],
    }
  }

  render() {
    let res = []

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Query query={Queries.GET_TASKS}>
          {({ data, error, loading }) => {
            if (error) return '💩 Oops!';
            if (loading) return 'Patience, patience...';

            res = data.tasks
            
            return (
              data.tasks.map(task => (
                <div key={task}>
                  <h2>ID: {task.id}</h2>
                  <h2>Problem: {task.problem}</h2>
                  <h2>Solution: {task.solution}</h2>
                </div>
              ))
            );
          }}
        </Query>

        <Query query={Queries.GET_USER_TASKS}>
          {({ data, error, loading }) => {
            if (error) return '💩 Oops!';
            if (loading) return 'Patience, patience...';
            
            return (
              data.userTasks.map(userTask => (
                <div key={userTask}>
                  <h2>Progress: {userTask.progress}</h2>
                  <h2>Task ID: {userTask.taskId}</h2>
                  <h2>Task Solution: {userTask.task.solution}</h2>
                </div>
              ))
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SecuredComponent;
