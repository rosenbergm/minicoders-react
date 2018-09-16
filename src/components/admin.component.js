import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import store from '../redux/store'
import { Link } from 'react-router-dom'
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class AdminComponent extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-main">
          <div>
            <h1>ADMIN</h1>
            <Button>Přidat úlohu</Button>
            {this.props.tasks.map(task => (
              <Card>
                <CardBody>
                  <CardTitle>{task.title}</CardTitle>
                  <CardSubtitle>{task.problem}</CardSubtitle>
                  <CardText>{task.solution}</CardText>
                  <CardText>{task.test}</CardText>
                  <CardText>{task.category}</CardText>
                  <Link to={`/task/edit/${task.taskId}`} style={{marginRight: '5px'}}>Upravit</Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks, task: state.task, user: state.user };
}

export default connect(mapStateToProps)(AdminComponent)
